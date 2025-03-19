// app/admin/page.tsx
import { promises as fs } from "fs";
import path from "path";
import { Artwork } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminArtworksGrid } from "@/components/AdminArtworksGrid";

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: {}; // Пустой объект, так как нет динамических параметров
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const artworksFile = path.join(process.cwd(), "data", "artworks.json");
  let artworks: Artwork[] = [];

  try {
    const data = await fs.readFile(artworksFile, "utf-8");
    console.log("Contents of artworks.json:", data);
    artworks = JSON.parse(data);
  } catch (error) {
    console.error("Error reading artworks.json:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Шапка */}
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
            <nav>{/* Submit Art убрано */}</nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Review Panel</h1>
        <AdminArtworksGrid initialArtworks={artworks} />
      </div>

      {/* Футер */}
      <footer className="py-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Seismic Art Area. Crafted with love ❤️
            </div>
            <div className="flex items-center space-x-6">
              {/* Submit Art убрано */}
              <Link
                href="https://seismic.systems/"
                target="_blank"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:underline"
              >
                Seismic.systems
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}