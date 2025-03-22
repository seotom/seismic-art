"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
    },
  }
);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);
    const logs: string[] = [];
    logs.push(`Attempting login with: ${JSON.stringify({ email, password })}`);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    logs.push(`Auth result: ${JSON.stringify({ data, authError })}`);

    if (authError) {
      setError(authError.message);
      logs.push(`Auth error: ${authError.message}`);
      localStorage.setItem("loginLogs", JSON.stringify(logs));
      setIsLoggingIn(false);
      return;
    }

    if (!data.session) {
      setError("No session returned. Please try again.");
      logs.push(`No session returned: ${JSON.stringify(data)}`);
      localStorage.setItem("loginLogs", JSON.stringify(logs));
      setIsLoggingIn(false);
      return;
    }

    logs.push(`Session user ID: ${data.session.user.id}`);
    logs.push(`Session tokens: ${data.session.access_token}, ${data.session.refresh_token}`);

    document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${data.session.expires_in}; SameSite=Lax`;
    document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=${data.session.expires_in}; SameSite=Lax`;
    logs.push(`Cookies set: ${document.cookie}`);

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", data.session.user.id)
      .single();

    logs.push(`Admin check result: ${JSON.stringify({ admin, adminError })}`);

    if (adminError || !admin) {
      setError("You are not authorized to access the admin panel.");
      logs.push(`Admin check failed: ${adminError?.message || "No admin record"}`);
      await supabase.auth.signOut();
      localStorage.setItem("loginLogs", JSON.stringify(logs));
      setIsLoggingIn(false);
      return;
    }

    logs.push("Login successful, redirecting to /admin");
    localStorage.setItem("loginLogs", JSON.stringify(logs));

    window.location.replace("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
              required
              disabled={isLoggingIn}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-600"
              required
              disabled={isLoggingIn}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}