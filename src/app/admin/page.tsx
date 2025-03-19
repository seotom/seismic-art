import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminArtworksGrid } from "@/components/AdminArtworksGrid";
import { SearchBar } from "@/components/SearchBar";
import { createClient } from "@supabase/supabase-js";
import { Artwork } from "@/lib/data";

// Инициализация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchTerm = searchParams.search || "";

  // Получаем арты с учётом поиска
  let query = supabase
    .from("artworks")
    .select("*")
    .order("id", { ascending: false });

  if (searchTerm) {
    query = query.or(
      `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    );
  }

  const { data: artworks, error } = await query;

  if (error) {
    console.error("Error fetching artworks:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Review Panel</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            // Это клиентский компонент, но для серверной фильтрации используем searchParams
          }}
        />
        <AdminArtworksGrid initialArtworks={(artworks || []) as Artwork[]} />
      </div>

      <footer className="py-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Seismic Art Area. Crafted with love ❤️
            </div>
            <div className="flex items-center space-x-6">
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