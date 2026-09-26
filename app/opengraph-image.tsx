import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";

export const alt = `${siteConfig.name} — Digital Solutions for Modern Businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand artwork, inlined because satori cannot load remote/local files by path.
 *  Sourced at 2x the rendered size so the data URI stays small. */
function readLogoDataUri(): string {
  const file = path.join(process.cwd(), "public", "images", "logo", "logo-og.png");
  return `data:image/png;base64,${readFileSync(file).toString("base64")}`;
}

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "radial-gradient(circle at 20% 15%, #10150c 0%, #0a0c09 55%, #06070a 100%)",
          color: "#f0f3ec",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- satori requires a raw img with an inlined data URI */}
          <img
            src={readLogoDataUri()}
            width={132}
            height={78}
            alt=""
          />
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            color: "#f0f3ec",
          }}
        >
          2Brothers Services
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#b7ff3c",
            marginTop: 20,
          }}
        >
          Digital solutions for modern businesses
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#9aa49a",
            marginTop: 16,
          }}
        >
          Websites • Business Systems • APIs • Cloud
        </div>
      </div>
    ),
    size
  );
}
