"use client";
import { useState } from "react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + " — " + url)}`;

  return (
    <div className="flex gap-3 items-center">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold px-4 py-2 rounded-full"
        style={{ background: "#E4FBF7", color: "#0E6B5F" }}
      >
        Share on WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="text-xs font-semibold px-4 py-2 rounded-full border"
        style={{ borderColor: "#1B1D28" }}
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
