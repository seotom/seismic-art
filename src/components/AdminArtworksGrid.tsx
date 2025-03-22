"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Artwork } from "@/lib/data";
import { approveArtwork, deleteArtwork } from "@/app/admin/actions";

interface AdminArtworksGridProps {
  initialArtworks: Artwork[];
}

export function AdminArtworksGrid({ initialArtworks }: AdminArtworksGridProps) {
  const mappedInitialArtworks = initialArtworks.map((artwork) => ({
    ...artwork,
    image: artwork.image || artwork.image_url,
  }));

  const [artworks, setArtworks] = useState<Artwork[]>(mappedInitialArtworks);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setArtworks(
      initialArtworks.map((artwork) => ({
        ...artwork,
        image: artwork.image || artwork.image_url,
      }))
    );
  }, [initialArtworks]);

  console.log("Initial artworks:", initialArtworks);
  console.log("Mapped initial artworks:", mappedInitialArtworks);
  console.log("Current artworks:", artworks);

  const handleApprove = async (id: number) => {
    if (confirm("Are you sure you want to approve this artwork?")) {
      startTransition(async () => {
        try {
          const updatedArtworks = await approveArtwork(id);
          const mappedUpdatedArtworks = updatedArtworks.map((artwork) => ({
            ...artwork,
            image: artwork.image || artwork.image_url,
          }));
          console.log("Updated artworks after approve:", mappedUpdatedArtworks);
          setArtworks(mappedUpdatedArtworks);
        } catch (error) {
          console.error("Error approving artwork:", error);
          alert("Failed to approve artwork");
        }
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
      startTransition(async () => {
        try {
          const updatedArtworks = await deleteArtwork(id);
          const mappedUpdatedArtworks = updatedArtworks.map((artwork) => ({
            ...artwork,
            image: artwork.image || artwork.image_url,
          }));
          console.log("Updated artworks after delete:", mappedUpdatedArtworks);
          setArtworks(mappedUpdatedArtworks);
        } catch (error) {
          console.error("Error deleting artwork:", error);
          alert("Failed to delete artwork");
        }
      });
    }
  };

  return (
    <>
      {artworks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No artworks found</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Try adjusting your search or upload some artworks.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="overflow-hidden hover:shadow-lg transition-shadow h-full"
            >
              <div className="relative w-full aspect-square">
                {artwork.image ? (
                  <a
                    href={artwork.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 hover:opacity-60 hover:shadow-lg transition-all duration-300"
                  >
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover hover:-translate-y-1 transition-transform duration-300"
                    />
                  </a>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{artwork.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {artwork.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="text-xs text-zinc-500 italic flex flex-col items-start gap-2">
                <div className="mb-4">By {artwork.username}</div>
                <div className="font-bold">Status: {artwork.isApproved ? "Approved" : "Pending"}</div>
                <div className="flex gap-2 mt-2">
                  {!artwork.isApproved && (
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      onClick={() => handleApprove(artwork.id)}
                      disabled={isPending}
                    >
                      Approve
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(artwork.id)}
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}
    </>
  );
}