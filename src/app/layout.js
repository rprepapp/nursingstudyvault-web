import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NursingStudyVault — Practical Files for Nursing Students",
  description: "Community health files, disease conditions, case studies, and nursing care plans — ready to download as PDF.",
  metadataBase: new URL("https://nursingstudyvault.online"),
  openGraph: {
    title: "NursingStudyVault — Practical Files for Nursing Students",
    description: "Community health files, disease conditions, case studies, and nursing care plans — ready to download as PDF.",
    url: "https://nursingstudyvault.online",
    siteName: "NursingStudyVault",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NursingStudyVault — Practical Files for Nursing Students",
    description: "Community health files, disease conditions, case studies, and nursing care plans — ready to download as PDF.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NursingStudyVault",
              url: "https://nursingstudyvault.online",
              description:
                "Practical files, case studies and nursing care plans for nursing students.",
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
