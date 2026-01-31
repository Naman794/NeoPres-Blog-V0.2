"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabaseClient";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", data.user?.id ?? "")
      .maybeSingle();

    if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
      await supabaseClient.auth.signOut();
      setError("Access denied. Ask an admin to assign your role.");
      setLoading(false);
      return;
    }

    if (data.session) {
      document.cookie = `sb-access-token=${data.session.access_token}; Path=/; SameSite=Lax`;
      document.cookie = `sb-refresh-token=${data.session.refresh_token}; Path=/; SameSite=Lax`;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
      <form
        className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleLogin}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Admin Login
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Welcome back</h1>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Email
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Password
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button
          className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-xs text-slate-500">
          First admin role must be set manually in Supabase profiles.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
