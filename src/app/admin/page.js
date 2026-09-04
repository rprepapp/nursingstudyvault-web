"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { auth } from "@/app/lib/firebase-auth";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  serverTimestamp, query, orderBy, onSnapshot, getDocs, where,
} from "firebase/firestore";
import { categories } from "@/app/data/categories";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyForm = {
  categorySlug: categories[0]?.slug || "",
  title: "",
  slug: "",
  summary: "",
  pageContent: "",
  driveLink: "",
  tags: "",
  keywords: "",
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("files");

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [requests, setRequests] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Email states
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/admin/login");
      } else {
        setUser(u);
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const q = query(collection(db, "files"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setFiles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "subscribers"), orderBy("subscribedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setSubscribers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // 🔥 Send email to all subscribers
  async function sendBulkEmail(e) {
    e.preventDefault();
    if (!emailSubject.trim() || !emailBody.trim()) {
      setEmailStatus("Please fill both subject and body.");
      return;
    }
    if (subscribers.length === 0) {
      setEmailStatus("No subscribers to send email to.");
      return;
    }

    setSendingEmail(true);
    setEmailStatus("Sending emails...");

    let successCount = 0;
    let failCount = 0;

    for (const sub of subscribers) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: sub.email,
            subject: emailSubject,
            html: `
              <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f6ff;">
                  <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                    <div style="text-align: center; margin-bottom: 25px;">
                      <h1 style="color: #1B1D28; font-size: 28px; margin: 0;">
                        Nursing<span style="color: #20C4B5;">Study</span><span style="color: #3E8EFF;">Vault</span>
                      </h1>
                    </div>
                    ${emailBody}
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
        if (response.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        failCount++;
      }
    }

    setEmailStatus(`✅ Sent: ${successCount}, Failed: ${failCount}`);
    setSendingEmail(false);
    setEmailSubject("");
    setEmailBody("");
  }

  function updateField(key, value) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  function updateSlug(value) {
    setSlugTouched(true);
    setForm((f) => ({ ...f, slug: slugify(value) }));
  }

  function startEdit(f) {
    setEditingId(f.id);
    setSlugTouched(true);
    setForm({
      categorySlug: f.categorySlug,
      title: f.title,
      slug: f.slug,
      summary: f.summary,
      pageContent: f.pageContent || "",
      driveLink: f.driveLink,
      tags: (f.tags || []).join(", "),
      keywords: (f.keywords || []).join(", "),
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setSlugTouched(false);
    setForm(emptyForm);
    setMessage("");
  }

  async function handleSubmit(e, publishImmediately = false) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const keywordsArray = form.keywords.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      const existingQuery = query(
        collection(db, "files"),
        where("slug", "==", form.slug),
        where("categorySlug", "==", form.categorySlug)
      );
      const existingSnap = await getDocs(existingQuery);

      if (editingId) {
        const exists = existingSnap.docs.some((d) => d.id !== editingId);
        if (exists) {
          setMessage("❌ Slug already exists in this category!");
          setSaving(false);
          return;
        }
      } else {
        if (!existingSnap.empty) {
          setMessage("❌ Slug already exists in this category!");
          setSaving(false);
          return;
        }
      }
    } catch (err) {
      setMessage("Error checking slug: " + err.message);
      setSaving(false);
      return;
    }

    const data = {
      categorySlug: form.categorySlug,
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      pageContent: form.pageContent,
      driveLink: form.driveLink,
      tags: tagsArray,
      keywords: keywordsArray,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "files", editingId), data);
        setMessage("✅ File updated successfully.");
        setEditingId(null);
        setSlugTouched(false);
      } else {
        await addDoc(collection(db, "files"), {
          ...data,
          published: publishImmediately,
          createdAt: serverTimestamp(),
        });
        setMessage(publishImmediately ? "✅ File published successfully." : "✅ Draft saved successfully.");
      }
      setForm(emptyForm);
      setSlugTouched(false);
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(f) {
    await updateDoc(doc(db, "files", f.id), { published: !f.published });
  }

  async function handleDelete(id) {
    if (confirm("Delete this file permanently?")) {
      await deleteDoc(doc(db, "files", id));
    }
  }

  async function markRequestDone(id) {
    await updateDoc(doc(db, "requests", id), { status: "done", updatedAt: serverTimestamp() });
  }

  async function deleteRequest(id) {
    if (confirm("Delete this request?")) {
      await deleteDoc(doc(db, "requests", id));
    }
  }

  async function deleteSubscriber(id) {
    if (confirm("Delete this subscriber?")) {
      await deleteDoc(doc(db, "subscribers", id));
    }
  }

  function handleSignOut() {
    signOut(auth);
    router.push("/admin/login");
  }

  if (checking) {
    return <div className="max-w-4xl mx-auto px-6 py-24 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-extrabold text-2xl">Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 rounded-full text-sm border"
          style={{ borderColor: "#E5E5EA" }}
        >
          Sign Out
        </button>
      </div>

      {message && (
        <div
          className="mb-6 px-4 py-3 rounded-xl text-sm"
          style={{
            background: message.startsWith("✅") ? "#E4FBF7" : "#FFF1E2",
            color: message.startsWith("✅") ? "#0E6B5F" : "#8A4E10",
          }}
        >
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b" style={{ borderColor: "#EDEDF3" }}>
        <button
          onClick={() => setActiveTab("files")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "files" ? "border-[#7C5CFC] text-[#7C5CFC]" : "border-transparent text-[#6B6F80]"
          }`}
        >
          📄 Files ({files.length})
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "requests" ? "border-[#7C5CFC] text-[#7C5CFC]" : "border-transparent text-[#6B6F80]"
          }`}
        >
          📥 Requests ({requests.filter(r => r.status !== "done").length})
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "subscribers" ? "border-[#7C5CFC] text-[#7C5CFC]" : "border-transparent text-[#6B6F80]"
          }`}
        >
          📧 Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Files Tab */}
      {activeTab === "files" && (
        <div>
          <div className="rounded-2xl p-6 mb-10" style={{ background: "#F8F6FF" }}>
            <h2 className="font-bold text-lg mb-4">
              {editingId ? "Edit File" : "Add New File"}
            </h2>
            <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold block mb-1">Category</label>
                <select
                  value={form.categorySlug}
                  onChange={(e) => updateField("categorySlug", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => updateSlug(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Summary</label>
                <input
                  type="text"
                  value={form.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Content (HTML)</label>
                <textarea
                  value={form.pageContent}
                  onChange={(e) => updateField("pageContent", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA", minHeight: "200px", fontFamily: "monospace" }}
                  placeholder="<h2>Heading</h2><p>Content...</p>"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Google Drive Link</label>
                <input
                  type="text"
                  value={form.driveLink}
                  onChange={(e) => updateField("driveLink", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  placeholder="https://drive.google.com/file/d/.../view"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => updateField("tags", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  placeholder="diabetes, care-plan, nanda"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1">Keywords</label>
                <input
                  type="text"
                  value={form.keywords}
                  onChange={(e) => updateField("keywords", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  placeholder="diabetes nursing care plan"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm text-white"
                  style={{ background: "#1B1D28" }}
                >
                  {saving ? "Saving..." : editingId ? "Update Draft" : "Save as Draft"}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm text-white"
                  style={{ background: "#20C4B5" }}
                >
                  {saving ? "Publishing..." : "Publish Now"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-2.5 rounded-full font-semibold text-sm border"
                    style={{ borderColor: "#E5E5EA" }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <h2 className="font-bold text-lg mb-4">All Files ({files.length})</h2>
          <div className="flex flex-col gap-3">
            {files.map((f) => (
              <div key={f.id} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "#EDEDF3" }}>
                <div>
                  <div className="font-semibold text-sm">{f.title}</div>
                  <div className="text-xs" style={{ color: "#6B6F80" }}>
                    /{f.categorySlug}/{f.slug} • {f.published ? "✅ Published" : "⛔ Draft"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => togglePublish(f)} className="px-3 py-1 rounded-full text-xs" style={{ background: f.published ? "#FFEAF2" : "#E4FBF7", color: f.published ? "#8A1F52" : "#0E6B5F" }}>
                    {f.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => startEdit(f)} className="px-3 py-1 rounded-full text-xs border" style={{ borderColor: "#E5E5EA" }}>Edit</button>
                  <button onClick={() => handleDelete(f.id)} className="px-3 py-1 rounded-full text-xs" style={{ background: "#FFF1E2", color: "#8A4E10" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div>
          <h2 className="font-bold text-lg mb-4">File Requests ({requests.length})</h2>
          {requests.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#6B6F80" }}>
              <div className="text-4xl mb-4">📭</div>
              <p className="font-semibold">No requests yet.</p>
              <p className="text-sm">Students will appear here when they request files.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {requests.map((r) => (
                <div key={r.id} className="p-5 rounded-xl border" style={{ borderColor: r.status === "done" ? "#E4FBF7" : "#EDEDF3", background: r.status === "done" ? "#F8FCFA" : "#FFFFFF" }}>
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div>
                      <div className="font-semibold text-base">{r.topic || "Untitled"}</div>
                      <div className="text-sm mt-1" style={{ color: "#6B6F80" }}>
                        <span className="font-medium">Category:</span> {r.category || "Not specified"}
                      </div>
                      <div className="text-sm mt-1" style={{ color: "#6B6F80" }}>
                        <span className="font-medium">From:</span> {r.name || "Anonymous"} {r.email && `<${r.email}>`}
                      </div>
                      {r.message && (
                        <div className="text-sm mt-2 p-3 rounded-lg" style={{ background: "#F8F6FF", color: "#3A3F4A" }}>
                          {r.message}
                        </div>
                      )}
                      <div className="text-xs mt-2" style={{ color: "#9A9FAD" }}>
                        {r.createdAt?.toDate?.()?.toLocaleString() || "Unknown date"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        r.status === "done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {r.status === "done" ? "✅ Done" : "⏳ Pending"}
                      </span>
                      {r.status !== "done" && (
                        <button
                          onClick={() => markRequestDone(r.id)}
                          className="px-3 py-1 rounded-full text-xs text-white"
                          style={{ background: "#20C4B5" }}
                        >
                          Mark Done
                        </button>
                      )}
                      <button
                        onClick={() => deleteRequest(r.id)}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ background: "#FFF1E2", color: "#8A4E10" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🔥 Subscribers Tab + Send Email */}
      {activeTab === "subscribers" && (
        <div>
          <h2 className="font-bold text-lg mb-4">📧 Subscribers ({subscribers.length})</h2>
          
          <div className="mb-4 p-4 rounded-xl" style={{ background: "#F8F6FF" }}>
            <p className="text-sm" style={{ color: "#6B6F80" }}>
              Total subscribers: <span className="font-bold" style={{ color: "#1B1D28" }}>{subscribers.length}</span>
            </p>
          </div>

          {/* 🔥 Send Email to All Subscribers */}
          <div className="mb-8 p-6 rounded-2xl border" style={{ borderColor: "#E5D9F5", background: "#FFFFFF" }}>
            <h3 className="font-bold text-lg mb-3">📤 Send Email to All Subscribers</h3>
            <p className="text-sm mb-4" style={{ color: "#6B6F80" }}>
              Send a notification to all {subscribers.length} subscribers.
            </p>
            <form onSubmit={sendBulkEmail} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold block mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject..."
                  className="w-full px-4 py-2.5 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA" }}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1">Message (HTML supported)</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your message here... Use <p>, <h2>, <ul>, etc."
                  className="w-full px-4 py-2.5 rounded-xl border outline-none text-sm"
                  style={{ borderColor: "#E5E5EA", minHeight: "150px", fontFamily: "monospace" }}
                  required
                />
              </div>
              {emailStatus && (
                <p className={`text-sm ${emailStatus.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
                  {emailStatus}
                </p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={sendingEmail || subscribers.length === 0}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm text-white transition hover:opacity-90 disabled:opacity-50"
                  style={{ background: "#7C5CFC" }}
                >
                  {sendingEmail ? "Sending..." : `Send to ${subscribers.length} Subscribers`}
                </button>
              </div>
            </form>
          </div>

          {/* Subscribers List */}
          {subscribers.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#6B6F80" }}>
              <div className="text-4xl mb-4">📭</div>
              <p className="font-semibold">No subscribers yet.</p>
              <p className="text-sm">Students will appear here when they subscribe.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {subscribers.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-4 rounded-xl border"
                  style={{ borderColor: "#EDEDF3" }}
                >
                  <div>
                    <div className="font-semibold text-sm">{s.email}</div>
                    <div className="text-xs" style={{ color: "#6B6F80" }}>
                      Subscribed: {s.subscribedAt?.toDate?.()?.toLocaleString() || "Unknown"}
                    </div>
                    <div className="text-xs" style={{ color: "#6B6F80" }}>
                      Status: <span className="font-medium" style={{ color: "#20C4B5" }}>{s.status || "active"}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSubscriber(s.id)}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ background: "#FFF1E2", color: "#8A4E10" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
