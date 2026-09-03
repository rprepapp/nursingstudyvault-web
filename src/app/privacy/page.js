import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "Privacy Policy | NursingStudyVault",
  description: "Read NursingStudyVault's Privacy Policy to understand what information we collect, how it is used, and your choices regarding cookies and advertising.",
  alternates: { canonical: "https://nursingstudyvault.online/privacy" },
};

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-we-collect", title: "2. Information we collect" },
  { id: "cookies", title: "3. Cookies and similar technologies" },
  { id: "advertising", title: "4. Advertising and third-party services" },
  { id: "how-we-use", title: "5. How we use information" },
  { id: "data-sharing", title: "6. Data sharing" },
  { id: "childrens-privacy", title: "7. Children's privacy" },
  { id: "your-choices", title: "8. Your choices" },
  { id: "changes", title: "9. Changes to this policy" },
  { id: "contact", title: "10. Contact us" },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        <div className="mb-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        </div>

        <div className="mb-10 pb-8 border-b border-gray-200">
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#0B1F3A] mb-2">Privacy Policy</h1>
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
              <strong className="text-[#0B1F3A]">In short:</strong> We collect minimal usage data to run the Site,
              don't sell your personal information, and use standard analytics/advertising cookies that you
              can opt out of anytime.
            </div>

            <div className="flex flex-col gap-10">

              <section id="introduction" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">1. Introduction</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  NursingStudyVault ("we", "us", "our") operates nursingstudyvault.online (the "Site").
                  This Privacy Policy explains what information we collect when you visit the Site, how
                  we use it, and the choices available to you. By using the Site, you agree to the
                  collection and use of information as described here.
                </p>
              </section>

              <section id="information-we-collect" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">2. Information we collect</h2>
                <p className="text-[15px] leading-7 text-gray-700 mb-3">
                  We aim to collect as little personal information as necessary to operate the Site. The
                  categories of information involved are:
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span><strong className="text-[#0B1F3A]">Usage data:</strong> pages visited, files viewed or downloaded, time spent on the Site, and referring pages, collected automatically through standard web analytics.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span><strong className="text-[#0B1F3A]">Device and log data:</strong> IP address, browser type, operating system, and general location (city/country level), collected automatically by our hosting and analytics providers.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span><strong className="text-[#0B1F3A]">Information you provide directly:</strong> if you contact us by email, we receive whatever information you choose to include, such as your name and email address.</span>
                  </li>
                </ul>
              </section>

              <section id="cookies" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">3. Cookies and similar technologies</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  The Site uses cookies and similar technologies to remember basic preferences, understand
                  how visitors use the Site, and — once advertising is enabled — to serve relevant
                  advertisements. You can control or disable cookies through your browser settings; doing
                  so may affect how parts of the Site function.
                </p>
              </section>

              <section id="advertising" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">4. Advertising and third-party services</h2>
                <div className="flex flex-col gap-3">
                  <p className="text-[15px] leading-7 text-gray-700">
                    We use, or intend to use, Google AdSense to display advertisements on the Site. Google,
                    as a third-party vendor, uses cookies to serve ads based on a visitor's prior visits to
                    this and other websites. Google's use of advertising cookies enables it and its
                    partners to serve ads based on your visit to this Site and/or other sites on the
                    internet.
                  </p>
                  <p className="text-[15px] leading-7 text-gray-700">
                    You may opt out of personalised advertising by visiting Google's Ads Settings at{" "}
                    <span className="font-semibold text-[#0891a1]">adssettings.google.com</span>, or opt out of a
                    third-party vendor's use of cookies for personalised advertising by visiting{" "}
                    <span className="font-semibold text-[#0891a1]">www.aboutads.info</span>.
                  </p>
                  <p className="text-[15px] leading-7 text-gray-700">
                    We may also use web analytics services (such as Google Analytics) to understand how
                    the Site is used in aggregate. These services may collect information sent by your
                    browser as part of a web page request.
                  </p>
                </div>
              </section>

              <section id="how-we-use" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">5. How we use information</h2>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>To operate, maintain and improve the Site and the files available on it.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>To understand which subjects and files are most useful to students, so we can prioritise new content.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>To respond to enquiries sent through our Contact page.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>To detect, prevent and address technical issues or misuse of the Site.</span>
                  </li>
                  <li className="flex gap-2 text-[15px] leading-7 text-gray-700">
                    <span className="text-[#00C2D1] font-bold flex-shrink-0">–</span>
                    <span>To display relevant advertising once advertising is enabled on the Site.</span>
                  </li>
                </ul>
              </section>

              <section id="data-sharing" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">6. Data sharing</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  We do not sell personal information. Information may be shared with service providers
                  who help us operate the Site (such as hosting and analytics providers) and with
                  advertising partners such as Google, strictly for the purposes described in this
                  policy. These third parties are bound by their own privacy policies governing use of
                  the data they process.
                </p>
              </section>

              <section id="childrens-privacy" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">7. Children's privacy</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  The Site is intended for nursing students and is not directed at children under 13. We
                  do not knowingly collect personal information from children under 13. If you believe a
                  child has provided us with personal information, please contact us so we can remove it.
                </p>
              </section>

              <section id="your-choices" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">8. Your choices</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  You may disable cookies in your browser, use browser extensions to limit tracking, and
                  opt out of personalised advertising using the links in Section 4. You may also contact
                  us to ask what information we hold about you or to request its deletion, where
                  applicable.
                </p>
              </section>

              <section id="changes" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">9. Changes to this policy</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices or for legal and regulatory reasons. The "Last updated" date at the top of
                  this page will reflect the most recent revision. Continued use of the Site after
                  changes are posted constitutes acceptance of the updated policy.
                </p>
              </section>

              <section id="contact" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">10. Contact us</h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  If you have questions about this Privacy Policy, contact us at{" "}
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
