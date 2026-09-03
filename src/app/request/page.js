import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Breadcrumb from "@/app/components/Breadcrumb";
import RequestForm from "./RequestForm";

export const metadata = {
  title: "Request a Nursing File | NursingStudyVault",
  description: "Need a specific nursing care plan, case study, or practical file? Request it and we'll create it for you — completely free.",
};

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navy header band */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-16 relative">
          <div className="[&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1] mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Request a File" }]} />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#00C2D1]/15 border border-[#00C2D1]/40 text-[#00C2D1] font-bold text-sm">
              📝 File Request
            </div>
            <h1 className="font-extrabold text-3xl md:text-4xl mb-3 text-white">
              Need a <span className="text-[#00C2D1]">specific file</span>?
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-300 mb-2">
              Tell us what you need — we'll create it and add it to the vault.
            </p>
            <p className="text-sm text-gray-400">
              Completely free for nursing students.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative pb-16">
        {/* Form */}
        <div className="rounded-3xl p-6 md:p-10 bg-white border-2 border-[#00C2D1]/20 shadow-lg">
          <RequestForm />
        </div>

        {/* Trust Section */}
        <div className="mt-10 text-center">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">✅ 100% Free</span>
            <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">✅ 3-5 Day Response</span>
            <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">✅ Verified Content</span>
            <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">✅ Nursing Curriculum Aligned</span>
          </div>
        </div>
      </div>
    </div>
  );
}
