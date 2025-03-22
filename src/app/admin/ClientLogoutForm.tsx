"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleLogout } from "./actions";

export default function ClientLogoutForm() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      await handleLogout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <form onSubmit={handleLogoutClick}>
      <button
        type="submit"
        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
          isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
}