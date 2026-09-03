"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-24">
      <h1 className="font-extrabold text-2xl mb-8 text-center">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-xl border outline-none text-sm"
          style={{ borderColor: "#E5E5EA" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-3 rounded-xl border outline-none text-sm"
          style={{ borderColor: "#E5E5EA" }}
        />
        {error && (
          <p className="text-sm" style={{ color: "#C1442E" }}>{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-full font-semibold text-sm text-white mt-2"
          style={{ background: "#1B1D28" }}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
