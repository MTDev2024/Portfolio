import { ImageResponse } from "next/og"
import { site } from "@/config/site"

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#222222",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "Inter",
        }}
      >
        {/* Label */}
        <p
          style={{
            color: "#B0B0B0",
            fontSize: 16,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Portfolio
        </p>

        {/* Nom */}
        <h1
          style={{
            color: "#F8F8F8",
            fontSize: 80,
            fontWeight: 600,
            margin: "20px 0 0 0",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </h1>

        {/* Titre métier */}
        <p
          style={{
            color: "#B0B0B0",
            fontSize: 28,
            margin: "24px 0 0 0",
            lineHeight: 1.4,
          }}
        >
          Développeur Frontend · React & Next.js
        </p>

        {/* Ligne décorative en bas */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 96,
            right: 96,
            height: 1,
            background: "#3a3a3a",
          }}
        />

        {/* URL du site */}
        <p
          style={{
            position: "absolute",
            bottom: 48,
            left: 96,
            color: "#B0B0B0",
            fontSize: 14,
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          {site.url.replace("https://", "")}
        </p>
      </div>
    ),
    { ...size }
  )
}
