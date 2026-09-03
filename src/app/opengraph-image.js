import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "NursingStudyVault — Practical Files for Nursing Students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(process.cwd(), "public", "logo.svg");
  const logoSvg = fs.readFileSync(logoPath, "utf8");
  const logoDataUrl = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F1ECFF 0%, #FFEAF2 50%, #FFF1E2 100%)",
        }}
      >
        <img src={logoDataUrl} width={130} height={130} style={{ marginBottom: 20 }} />

        <div style={{ display: "flex", fontSize: 66, fontWeight: 800, color: "#1B1D28" }}>
          <span>Nursing</span>
          <span style={{ color: "#20C4B5" }}>Study</span>
          <span style={{ color: "#3E8EFF" }}>Vault</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6B6F80", marginTop: 20 }}>
          Practical Files, Case Studies &amp; Nursing Care Plans
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            padding: "14px 32px",
            borderRadius: 999,
            background: "#1B1D28",
            color: "#fff",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          nursingstudyvault.online
        </div>
      </div>
    ),
    { ...size }
  );
}
