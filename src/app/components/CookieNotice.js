"use client";
import { useState, useEffect } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("nsv_cookie_notice_dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function handleDismiss() {
    localStorage.setItem("nsv_cookie_notice_dismissed", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center bg-black/50 px-4 py-6">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#00C2D1]/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-lg flex-shrink-0">🍪</span>
          <h2 className="font-extrabold text-lg text-[#0B1F3A]">Cookies Required for PDF Viewing</h2>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed mb-3">
          <span className="font-bold text-[#0B1F3A]">English: </span>
          Our nursing files are displayed using an embedded document viewer, which requires
          third-party cookies to work. When viewing any file, your browser may show a prompt
          from Google asking you to allow cookies — please tap <strong>"Allow cookies"</strong> so
          the document can load properly.
        </div>

        <div className="text-sm text-gray-700 leading-relaxed mb-5 pt-3 border-t border-gray-100">
          <span className="font-bold text-[#0B1F3A]">हिंदी: </span>
          हमारी नर्सिंग फाइलें एक embedded document viewer के ज़रिए दिखाई जाती हैं, जिसे काम करने के लिए
          third-party cookies की ज़रूरत होती है। किसी भी फाइल को देखते समय, आपके ब्राउज़र में Google की तरफ से
          cookies allow करने का एक popup आ सकता है — कृपया <strong>"Allow cookies"</strong> पर टैप करें
          ताकि document सही तरीके से लोड हो सके।
        </div>

        <button
          onClick={handleDismiss}
          className="w-full py-3 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
        >
          Okay, Got It / ठीक है
        </button>
      </div>
    </div>
  );
}
