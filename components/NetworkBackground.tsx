"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
}

interface Pulse {
  a: number;
  b: number;
  t: number;
  duration: number;
}

interface Palette {
  line: string; // connection lines
  node: string; // node dots
  pulse: string; // travelling highlight
}

/**
 * Subtle developer/network background rendered on canvas.
 * Reads its accent colors from the current theme's CSS variables so it
 * adapts to dark/light mode. Lays strictly behind content and respects
 * prefers-reduced-motion.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useRef(false);
  const paletteRef = useRef<Palette>({ line: "", node: "", pulse: "" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let lastPulse = 0;
    let paused = false;

    const cssVar = (name: string): string => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return value;
    };

    // Convert a theme color into [r,g,b] for alpha blending.
    // Handles: "183 255 60" (channel triplet), "#b7ff3c", and "rgba(...)".
    const parseColor = (c: string): [number, number, number] => {
      const bare = c.match(/^(\d+)\s+(\d+)\s+(\d+)$/);
      if (bare) return [Number(bare[1]), Number(bare[2]), Number(bare[3])];
      if (c.startsWith("#")) {
        const hex = c.replace("#", "");
        const full =
          hex.length === 3
            ? hex.split("").map((h) => h + h).join("")
            : hex;
        return [
          parseInt(full.slice(0, 2), 16),
          parseInt(full.slice(2, 4), 16),
          parseInt(full.slice(4, 6), 16),
        ];
      }
      const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
      return [183, 255, 60];
    };

      const refreshPalette = () => {
        const accent = parseColor(cssVar("--accent"));
        const [r, g, b] = accent;
        paletteRef.current = {
          line: `rgba(${r},${g},${b},`,
          node: `rgba(${r},${g},${b},`,
          pulse: `rgba(${r},${g},${b},`,
        };
      };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const init = () => {
      const targetCount = Math.min(
        60,
        Math.max(28, Math.floor((width * height) / 30000))
      );
      nodes = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.6 + Math.random() * 1.2,
        pulse: Math.random() * Math.PI * 2,
      }));
      pulses = [];
    };

    const connectDistance = 150;
    const ALPHA_BUCKETS = 5;

    const step = (time: number) => {
      if (!reducedMotion.current) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = width + 10;
          else if (n.x > width + 10) n.x = -10;
          if (n.y < -10) n.y = height + 10;
          else if (n.y > height + 10) n.y = -10;
        }
      }

      if (!reducedMotion.current && time - lastPulse > 6000 && nodes.length > 1) {
        // find two nearby nodes to animate a connection
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            if (dx * dx + dy * dy < connectDistance * connectDistance) {
              pulses.push({ a: i, b: j, t: 0, duration: 900 + Math.random() * 600 });
              lastPulse = time;
              return;
            }
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      step(time);

      const pal = paletteRef.current;

      // Connection lines, batched into a few alpha buckets so the whole
      // network costs a handful of stroke calls instead of one per pair.
      ctx.lineWidth = 0.5;
      for (let bucket = 0; bucket < ALPHA_BUCKETS; bucket++) {
        const alpha = (1 - (bucket + 0.5) / ALPHA_BUCKETS) * 0.14;
        ctx.strokeStyle = pal.line + alpha.toFixed(3) + ")";
        ctx.beginPath();
        let drew = false;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq >= connectDistance * connectDistance) continue;
            const level = Math.min(
              ALPHA_BUCKETS - 1,
              Math.floor(((1 - Math.sqrt(distSq) / connectDistance) * ALPHA_BUCKETS))
            );
            if (level !== bucket) continue;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            drew = true;
          }
        }
        if (drew) ctx.stroke();
      }

      // Node dots, batched into a few alpha buckets so the "breathing" effect
      // survives without one fill call per node.
      for (let bucket = 0; bucket < ALPHA_BUCKETS; bucket++) {
        const alpha = 0.22 + ((bucket + 0.5) / ALPHA_BUCKETS) * 0.12;
        ctx.fillStyle = pal.node + alpha.toFixed(3) + ")";
        ctx.beginPath();
        let drew = false;
        for (const n of nodes) {
          const breath = reducedMotion.current
            ? 0
            : 0.3 * Math.sin(n.pulse + time / 1800);
          const level = Math.min(
            ALPHA_BUCKETS - 1,
            Math.max(0, Math.floor(((breath + 0.3) / 0.6) * ALPHA_BUCKETS))
          );
          if (level !== bucket) continue;
          ctx.moveTo(n.x + n.r, n.y);
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          drew = true;
        }
        if (drew) ctx.fill();
      }

      // pulse animations
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const na = nodes[pulse.a];
        const nb = nodes[pulse.b];
        const progress = Math.min(1, pulse.t / pulse.duration);
        const x = na.x + (nb.x - na.x) * progress;
        const y = na.y + (nb.y - na.y) * progress;
        const glow = Math.sin(Math.PI * progress);
        ctx.fillStyle = pal.pulse + (0.55 * glow).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(x, y, 1.4 + glow, 0, Math.PI * 2);
        ctx.fill();
        pulse.t += 16;
        if (pulse.t >= pulse.duration) pulses.splice(p, 1);
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (paused) return;
      draw(time);
    };

    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    refreshPalette();
    resize();

    // Reduced motion: paint one static frame, then stop the loop entirely.
    if (reducedMotion.current) {
      draw(0);
      stop();
    } else {
      start();
    }

    // Only animate while the canvas is actually on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
        if (paused) stop();
        else start();
      },
      { threshold: 0 }
    );
    visibility.observe(canvas);

    const onThemeChange = () => {
      refreshPalette();
      if (paused) return;
      draw(performance.now());
    };
    window.addEventListener("themechange", onThemeChange);

    const onVisibility = () => {
      if (document.hidden || paused) {
        stop();
      } else {
        start();
      }
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      visibility.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onThemeChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
