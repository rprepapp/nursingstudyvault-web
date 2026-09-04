"use client";
import { useState } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const subscriberId = email.trim().toLowerCase();
      const subscriberRef = doc(db, "subscribers", subscriberId);

      // Check if email already exists
      const existingDoc = await getDoc(subscriberRef);
      if (existingDoc.exists()) {
        setStatus("error");
        setMessage("This email is already subscribed.");
        return;
      }

      // Save to Firestore
      await setDoc(subscriberRef, {
        email: email.trim(),
        subscribedAt: serverTimestamp(),
        status: "active",
        source: "footer_newsletter",
      });

      // 📬 Add to Hostinger Reach
      try {
        const reachResponse = await fetch("/api/subscribe-to-reach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
        if (!reachResponse.ok) {
          console.error("Reach sync failed:", await reachResponse.json());
        } else {
          console.log("✅ Added to Hostinger Reach");
        }
      } catch (reachErr) {
        console.error("Reach sync error:", reachErr);
        // Don't fail the subscription if Reach sync fails
      }

      // 🔥 Send welcome email
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: email.trim(),
            subject: "Welcome to NursingStudyVault! 🎉",
            html: `
              <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f6ff;">
                  <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                    <div style="text-align: center; margin-bottom: 25px;">
                      <h1 style="color: #1B1D28; font-size: 28px; margin: 0;">
                        Nursing<span style="color: #20C4B5;">Study</span><span style="color: #3E8EFF;">Vault</span>
                      </h1>
                    </div>
                    <h2 style="color: #1B1D28; font-size: 22px; margin-bottom: 15px;">Welcome to NursingStudyVault! 🎉</h2>
                    <p style="color: #3A3F4A; font-size: 16px; line-height: 1.6;">Thank you for subscribing. You'll now receive updates about new nursing files.</p>
                    <p style="color: #3A3F4A; font-size: 16px; line-height: 1.6;">Here's what you can do next:</p>
                    <ul style="color: #3A3F4A; font-size: 16px; line-height: 1.8;">
                      <li><a href="https://nursingstudyvault.online/categories" style="color: #7C5CFC; text-decoration: none; font-weight: 600;">Browse all categories</a></li>
                      <li><a href="https://nursingstudyvault.online/request" style="color: #7C5CFC; text-decoration: none; font-weight: 600;">Request a specific file</a></li>
                    </ul>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #EDEDF3; text-align: center; color: #9A9FAD; font-size: 14px;">
                      <p>You are receiving this email because you subscribed to NursingStudyVault.</p>
                      <p>© 2026 NursingStudyVault.online — All rights reserved.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Email send failed:", data);
        } else {
          console.log("✅ Welcome email sent:", data);
        }
      } catch (emailErr) {
        console.error("Email error:", emailErr);
        // Don't fail the subscription if email fails
      }

      setStatus("success");
      setMessage("✅ Subscribed successfully! Check your email.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Error: " + err.message);
    }
  }

  return (
    <div>
      <div className="font-bold text-sm mb-2">Get notified about new files</div>
      <form onSubmit={handleSubmit} className="flex max-w-xs">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-4 py-2.5 text-sm rounded-l-full border outline-none bg-white"
          style={{ borderColor: "#E5D9F5", color: "#1B1D28" }}
          disabled={status === "loading"}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 rounded-r-full text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#7C5CFC,#FF5D9E)" }}
        >
          {status === "loading" ? "..." : "→"}
        </button>
      </form>
      {message && (
        <p className={`text-xs mt-2 ${status === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
