// components/Header.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SubmitArtModal } from "@/components/SubmitArtModal";
import { useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="py-6 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/favicon.svg"
                alt="Seismic Art Hub"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold">Seismic Art Area</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium hover:underline"
              >
                Submit Art
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <SubmitArtModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}