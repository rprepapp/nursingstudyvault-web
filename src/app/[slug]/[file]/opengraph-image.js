import { ImageResponse } from "next/og";
import { getFileFromFirestore } from "./lib";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug, file } = await params;
  const fileData = await getFileFromFirestore(slug, file);

  if (!fileData) {
    return new ImageResponse(
      <div style={{ background: "#1B1D28", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 40 }}>
        NursingStudyVault
      </div>,
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F1ECFF 0%, #FFEAF2 50%, #FFF1E2 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 800,
            color: "#1B1D28",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {fileData.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6B6F80",
            marginBottom: 30,
          }}
        >
          {fileData.summary?.substring(0, 120) || "Nursing Practical File"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              padding: "10px 28px",
              borderRadius: 999,
              background: "#1B1D28",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            NursingStudyVault
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
