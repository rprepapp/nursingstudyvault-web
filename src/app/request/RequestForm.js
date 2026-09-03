"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const categories = [
  "Nursing Care Plan",
  "Case Study",
  "Assignment",
  "Procedure",
  "Health Education",
  "Surgical Care Plan",
  "Health Talk",
  "Family Folder",
  "Case Presentation",
];

export default function RequestForm() {
  const [form, setForm] = useState({ name: "", email: "", category: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "requests"), {
        ...form,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="font-extrabold text-3xl mb-3" style={{ color: "#1B1D28" }}>
          Request Submitted!
        </h2>
        <p className="text-base max-w-sm mx-auto mb-8" style={{ color: "#6B6F80" }}>
          We'll review your request and prioritise it. You'll hear from us soon.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{ background: "#1B1D28" }}
          >
            Back to Home
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", category: "", topic: "", message: "" });
            }}
            className="px-8 py-3.5 rounded-full font-semibold text-sm border-2"
            style={{ borderColor: "#1B1D28", color: "#1B1D28" }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: "#3A3F4A" }}>
            Your Name <span className="font-normal" style={{ color: "#9A9FAD" }}>(optional)</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-3.5 rounded-xl border outline-none text-sm transition focus:ring-2"
            style={{ borderColor: "#E5E5EA", background: "#FFFFFF" }}
            placeholder="e.g. Priya Sharma"
          />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: "#3A3F4A" }}>
            Your Email <span className="font-normal" style={{ color: "#9A9FAD" }}>(optional)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-3.5 rounded-xl border outline-none text-sm transition focus:ring-2"
            style={{ borderColor: "#E5E5EA", background: "#FFFFFF" }}
            placeholder="e.g. priya@example.com"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold block mb-2" style={{ color: "#3A3F4A" }}>
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-5 py-3.5 rounded-xl border outline-none text-sm transition focus:ring-2"
          style={{ borderColor: "#E5E5EA", background: "#FFFFFF" }}
          required
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold block mb-2" style={{ color: "#3A3F4A" }}>
          Topic / Disease / Condition <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="w-full px-5 py-3.5 rounded-xl border outline-none text-sm transition focus:ring-2"
          style={{ borderColor: "#E5E5EA", background: "#FFFFFF" }}
          placeholder="e.g. Diabetes Mellitus, Hypertension, COPD, Mental Health"
          required
        />
        <div className="text-xs mt-1.5" style={{ color: "#9A9FAD" }}>
          💡 Be specific for faster creation
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold block mb-2" style={{ color: "#3A3F4A" }}>
          Additional Details <span className="font-normal" style={{ color: "#9A9FAD" }}>(optional)</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-5 py-3.5 rounded-xl border outline-none text-sm transition focus:ring-2"
          style={{ borderColor: "#E5E5EA", background: "#FFFFFF", minHeight: "140px" }}
          placeholder="Any specific format, college requirements, or additional context..."
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between pt-2">
        <div className="text-xs" style={{ color: "#9A9FAD" }}>
          <span className="text-red-500">*</span> Required fields
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3.5 rounded-full font-semibold text-sm text-white transition hover:opacity-90"
          style={{ background: "#7C5CFC" }}
        >
          {loading ? "Submitting..." : "Submit Request →"}
        </button>
      </div>
    </form>
  );
}
