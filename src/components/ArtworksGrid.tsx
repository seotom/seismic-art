// components/ArtworksGrid.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArtworkCard } from "@/components/ArtworkCard";
import { SearchBar } from "@/components/SearchBar";
import { Artwork } from "@/lib/data";

interface ArtworksGridProps {
  initialArtworks: Artwork[];
}

export function ArtworksGrid({ initialArtworks }: ArtworksGridProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    router.push(`/?search=${encodeURIComponent(value)}`);
  };

  const filteredArtworks = initialArtworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-md mx-auto mb-12">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {filteredArtworks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No artworks found</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Try adjusting your search or browse our full collection.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              description={artwork.description}
              image={artwork.image}
              username={artwork.username}
            />
          ))}
        </section>
      )}
    </>
  );
}