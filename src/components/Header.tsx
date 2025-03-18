import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="py-6 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/favicon.svg"
              alt="Caldera Art Hub"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-semibold">Seismic Art Hub</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav>
            <Link
              href="#"
              target="_blank"
              className="text-sm font-medium hover:underline"
            >
              Submit Art
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
