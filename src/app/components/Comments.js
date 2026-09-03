"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";

function formatDate(ts) {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Email masking function
function maskEmail(email) {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return email;
  const maskedLocal = localPart[0] + "*".repeat(localPart.length - 2) + localPart[localPart.length - 1];
  return maskedLocal + "@" + domain;
}

export default function Comments({ fileId, fileSlug, categorySlug }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Load saved name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("nsv_comment_name");
    if (savedName) setName(savedName);
    const savedEmail = localStorage.getItem("nsv_comment_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  useEffect(() => {
    if (!fileId) return;

    const q = query(
      collection(db, "comments"),
      where("fileId", "==", fileId)
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || 0;
        const dateB = b.createdAt?.toDate?.() || 0;
        return dateB - dateA;
      });
      setComments(data);
    });

    return () => unsubscribe();
  }, [fileId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!newComment.trim()) {
      setFormError("Please write a comment.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "comments"), {
        fileId,
        fileSlug,
        categorySlug,
        text: newComment.trim(),
        userName: name.trim(),
        userEmail: email.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setNewComment("");
      // Save name & email to localStorage
      localStorage.setItem("nsv_comment_name", name.trim());
      localStorage.setItem("nsv_comment_email", email.trim());
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: "#EDEDF3" }}>
      <h3 className="font-bold text-lg mb-4">
        💬 Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name *"
              className="px-4 py-2.5 rounded-xl border outline-none text-sm"
              style={{ borderColor: "#E5E5EA" }}
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email * (will be masked)"
              className="px-4 py-2.5 rounded-xl border outline-none text-sm"
              style={{ borderColor: "#E5E5EA" }}
              required
            />
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment... *"
            className="w-full px-4 py-3 rounded-xl border outline-none text-sm resize-y"
            style={{ borderColor: "#E5E5EA", minHeight: "80px" }}
            required
          />
          {formError && (
            <p className="text-sm" style={{ color: "#C1442E" }}>{formError}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-6 py-2.5 rounded-full font-semibold text-sm text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ background: "#7C5CFC" }}
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8" style={{ color: "#9A9FAD" }}>
          <p className="text-sm">No comments yet. Be the first!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl"
              style={{ background: "#F8F6FF" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-sm">
                    {c.userName || "Anonymous"}
                  </span>
                  <span className="text-xs ml-2" style={{ color: "#9A9FAD" }}>
                    • {formatDate(c.createdAt)}
                  </span>
                  <span className="text-xs ml-2" style={{ color: "#9A9FAD" }}>
                    • {maskEmail(c.userEmail || "")}
                  </span>
                </div>
              </div>
              <p className="text-sm mt-1" style={{ color: "#3A3F4A" }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
