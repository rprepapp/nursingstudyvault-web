"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-xs font-semibold px-4 py-2 rounded-full border"
      style={{ borderColor: "#1B1D28" }}
    >
      Print Page
    </button>
  );
}
