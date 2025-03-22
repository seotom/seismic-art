"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";

interface AdminSearchProps {
  initialSearchTerm: string;
}

export function AdminSearch({ initialSearchTerm }: AdminSearchProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const url = value ? `/admin?search=${encodeURIComponent(value)}` : "/admin";
    router.push(url);
    // router.refresh();
  };

  return (
    <div className="max-w-md mx-auto mb-12">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
    </div>
  );
}