import Image from "next/image";
import Newsletter from "./Newsletter";

const categoryCol = [
  { name: "Nursing Care Plan", href: "/nursing-care-plan" },
  { name: "Case Study", href: "/case-study" },
  { name: "Assignment", href: "/assignment" },
  { name: "Procedure", href: "/procedure" },
  { name: "Health Education", href: "/health-education" },
];

const moreCol = [
  { name: "Surgical Care Plan", href: "/surgical-care-plan" },
  { name: "Health Talk", href: "/health-talk" },
  { name: "Family Folder", href: "/family-folder" },
  { name: "Case Presentation", href: "/case-presentation" },
];

const infoCol = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Request a File", href: "/request" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.svg"
                alt="NursingStudyVault logo"
                width={40}
                height={40}
              />
              <div>
                <span className="font-extrabold text-xl text-white">
                  Nursing<span className="text-[#00C2D1]">Study</span>Vault
                </span>
                <span className="block text-xs text-gray-400 mt-0.5">
                  Your Complete Nursing Resource Hub
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-md mb-6 leading-relaxed">
              Empowering nursing students with comprehensive practical files,
              evidence-based case studies, and professionally formatted care plans.
              Trusted by GNM and BSc Nursing students across India.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/5 border border-[#00C2D1]/30 rounded-xl px-4 py-3">
                <div className="text-xl font-extrabold text-[#00C2D1]">10K+</div>
                <div className="text-xs text-gray-400">Downloads</div>
              </div>
              <div className="bg-white/5 border border-[#00C2D1]/30 rounded-xl px-4 py-3">
                <div className="text-xl font-extrabold text-[#00C2D1]">500+</div>
                <div className="text-xs text-gray-400">Students Helped</div>
              </div>
              <div className="bg-white/5 border border-[#00C2D1]/30 rounded-xl px-4 py-3">
                <div className="text-xl font-extrabold text-[#00C2D1]">50+</div>
                <div className="text-xs text-gray-400">Colleges</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-[#00C2D1]/15 rounded-lg flex items-center justify-center text-base">📧</span>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Support</div>
                  <a
                    href="mailto:support@nursingstudyvault.online"
                    className="text-gray-300 hover:text-[#00C2D1] transition-colors text-sm font-medium"
                  >
                    support@nursingstudyvault.online
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-[#00C2D1]/15 rounded-lg flex items-center justify-center text-base">💬</span>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Help Desk</div>
                  <a
                    href="mailto:help@nursingstudyvault.online"
                    className="text-gray-300 hover:text-[#00C2D1] transition-colors text-sm font-medium"
                  >
                    help@nursingstudyvault.online
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Newsletter />
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-bold text-white text-sm mb-6 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-8 h-8 bg-[#00C2D1]/15 rounded-lg flex items-center justify-center">📚</span>
              Categories
            </h3>
            <ul className="space-y-3">
              {categoryCol.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="text-gray-400 hover:text-[#00C2D1] text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#00C2D1] transition-colors" />
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Column */}
          <div>
            <h3 className="font-bold text-white text-sm mb-6 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-8 h-8 bg-[#00C2D1]/15 rounded-lg flex items-center justify-center">📋</span>
              More
            </h3>
            <ul className="space-y-3">
              {moreCol.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="text-gray-400 hover:text-[#00C2D1] text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#00C2D1] transition-colors" />
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h3 className="font-bold text-white text-sm mb-6 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-8 h-8 bg-[#00C2D1]/15 rounded-lg flex items-center justify-center">ℹ️</span>
              Info
            </h3>
            <ul className="space-y-3">
              {infoCol.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="text-gray-400 hover:text-[#00C2D1] text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#00C2D1] transition-colors" />
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 mb-8 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-[#00C2D1]/20 rounded-full px-4 py-2">
            <span className="text-[#00C2D1]">✓</span>
            <span className="text-xs text-gray-300 font-medium">Free Forever</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-[#00C2D1]/20 rounded-full px-4 py-2">
            <span className="text-[#00C2D1]">✓</span>
            <span className="text-xs text-gray-300 font-medium">Regular Updates</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-[#00C2D1]/20 rounded-full px-4 py-2">
            <span className="text-[#00C2D1]">✓</span>
            <span className="text-xs text-gray-300 font-medium">Easy Downloads</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-[#00C2D1]/20 rounded-full px-4 py-2">
            <span className="text-[#00C2D1]">✓</span>
            <span className="text-xs text-gray-300 font-medium">Student Support</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="text-center md:text-left">
            <span className="font-semibold text-gray-400">© 2026 NursingStudyVault.online</span> — All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-center">
            <span>⚕️</span>
            <span>Educational purpose only — not a substitute for professional medical advice.</span>
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="/disclaimer" className="hover:text-gray-300 transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
