import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";

export const alt = `${siteConfig.name} — Digital Solutions for Modern Businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 40,
              fontWeight: 700,
              color: "#b7ff3c",
            }}
          >
            {"</>"}
          </span>
          <span
            style={{
              height: 2,
              width: 48,
              background: "#b7ff3c",
              opacity: 0.5,
            }}
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
