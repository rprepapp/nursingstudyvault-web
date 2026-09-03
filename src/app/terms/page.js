import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "Terms of Service | NursingStudyVault",
  description: "Review the Terms of Service governing your use of NursingStudyVault's nursing practical files, case studies, and care plan resources.",
  alternates: { canonical: "https://nursingstudyvault.online/terms" },
};

const sections = [
  { id: "acceptance", title: "1. Acceptance of terms" },
  { id: "purpose", title: "2. Purpose of the Site" },
  { id: "use-of-content", title: "3. Use of content" },
  { id: "no-medical-advice", title: "4. No medical or clinical advice" },
  { id: "accuracy", title: "5. Accuracy of content" },
  { id: "ip", title: "6. Intellectual property" },
  { id: "advertising", title: "7. Advertising" },
  { id: "liability", title: "8. Limitation of liability" },
  { id: "changes", title: "9. Changes to these terms" },
  { id: "contact", title: "10. Contact us" },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        <div className="mb-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
        </div>

        <div className="mb-10 pb-8 border-b border-gray-200">
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#0B1F3A] mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: September 1, 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">

          {/* ===== Sticky Table of Contents ===== */}
          <nav className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
            <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">On this page</div>
            <ul className="flex flex-col gap-1 border-l-2 border-gray-100">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block pl-4 py-1.5 text-sm text-gray-500 hover:text-[#0891a1] hover:border-l-2 hover:border-[#00C2D1] hover:-ml-0.5 transition-all"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Content ===== */}
          <div className="min-w-0 max-w-2xl">

            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 border border-gray-200 rounded-lg p-4 mb-10">
              <strong className="text-[#0B1F3A]">In short:</strong> Files are free for personal academic use,
              not for resale or bulk redistribution, and content is for study purposes only — not
              clinical advice.
            </div>

            <div className="flex flex-col gap-10">

              <section id="acceptance" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">1. Acceptance of terms</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  By accessing or using nursingstudyvault.online (the "Site"), you agree to be bound by
                  these Terms of Service. If you do not agree to these terms, please do not use the
                  Site.
                </p>
              </section>

              <section id="purpose" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">2. Purpose of the Site</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  NursingStudyVault provides study and reference materials — including community health
                  files, disease condition write-ups, case studies, and nursing care plans — intended to
                  support nursing students in preparing their own practical files and coursework. The
                  Site is an independent educational resource and is not affiliated with, endorsed by,
                  or officially connected to any nursing council, university, or training institution
                  unless explicitly stated.
                </p>
              </section>

              <section id="use-of-content" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">3. Use of content</h2>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>Files on the Site are provided for personal, non-commercial, educational use only.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>You may download and adapt files for your own coursework and clinical documentation.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>You may not resell, redistribute in bulk, or republish our files on another website or platform without prior written permission.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>You remain responsible for verifying that any submitted work complies with your institution's academic integrity policies.</span>
                  </li>
                </ul>
              </section>

              <section id="no-medical-advice" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">4. No medical or clinical advice</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  Content on the Site is intended for academic and study purposes only. It is not a
                  substitute for professional medical judgment, your institution's clinical protocols,
                  or guidance from your clinical instructors and supervising healthcare professionals.
                  Always verify clinical content against current, authoritative textbooks and your
                  institution's standards before relying on it in an academic or clinical setting.
                </p>
              </section>

              <section id="accuracy" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">5. Accuracy of content</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  We take reasonable care to ensure files are well-researched and consistently
                  formatted. However, nursing curricula, protocols, and drug information can change, and
                  we do not guarantee that every file reflects the most current clinical guidelines or
                  your specific institution's requirements. If you notice an error, please report it
                  through our Contact page so we can review and correct it.
                </p>
              </section>

              <section id="ip" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">6. Intellectual property</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  All original content on the Site, including text, file layouts, graphics, and the
                  NursingStudyVault name and logo, is the property of NursingStudyVault unless otherwise
                  stated. You may not use our branding or content to represent your own service or
                  website without permission.
                </p>
              </section>

              <section id="advertising" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">7. Advertising</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  The Site may display third-party advertisements, including through Google AdSense, to
                  support the cost of hosting and maintaining the Site. Advertisements are served by
                  third-party providers, and we are not responsible for the content of ads shown on the
                  Site. See our{" "}
                  <a href="/privacy" className="font-semibold text-[#0891a1] hover:underline">Privacy Policy</a>{" "}
                  for details on how advertising cookies are used.
                </p>
              </section>

              <section id="liability" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">8. Limitation of liability</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  The Site and its content are provided "as is" without warranties of any kind, express
                  or implied. To the fullest extent permitted by law, NursingStudyVault shall not be
                  liable for any indirect, incidental, or consequential damages arising from your use of
                  the Site or reliance on its content, including academic or clinical outcomes.
                </p>
              </section>

              <section id="changes" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">9. Changes to these terms</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  We may revise these Terms of Service from time to time. The "Last updated" date above
                  will reflect the most recent revision. Continued use of the Site after changes are
                  posted constitutes acceptance of the updated terms.
                </p>
              </section>

              <section id="contact" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">10. Contact us</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  Questions about these terms can be sent to{" "}
                  <a href="mailto:support@nursingstudyvault.online" className="font-semibold text-[#0891a1] hover:underline">
                    support@nursingstudyvault.online
                  </a>.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
