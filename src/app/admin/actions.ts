// app/admin/actions.ts
"use server";

import { promises as fs } from "fs";
import path from "path";
import { Artwork } from "@/lib/data";

const artworksFile = path.join(process.cwd(), "data", "artworks.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

async function getArtworks(): Promise<Artwork[]> {
  try {
    const data = await fs.readFile(artworksFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading artworks.json:", error);
    return [];
  }
}

async function saveArtworks(artworks: Artwork[]) {
  try {
    await fs.writeFile(artworksFile, JSON.stringify(artworks, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to artworks.json:", error);
    throw error;
  }
}

export async function approveArtwork(id: number): Promise<Artwork[]> {
  const artworks = await getArtworks();
  const updatedArtworks = artworks.map((artwork) =>
    artwork.id === id ? { ...artwork, isApproved: true } : artwork
  );
  await saveArtworks(updatedArtworks);
  return updatedArtworks;
}

export async function deleteArtwork(id: number): Promise<Artwork[]> {
  const artworks = await getArtworks();
  const artworkToDelete = artworks.find((artwork) => artwork.id === id);
  
  if (artworkToDelete) {
    // Удаляем файл изображения
    const imagePath = path.join(uploadsDir, path.basename(artworkToDelete.image));
    try {
      await fs.unlink(imagePath);
      console.log(`Deleted image file: ${imagePath}`);
    } catch (error) {
      console.error(`Error deleting image file ${imagePath}:`, error);
      // Не прерываем выполнение, если файл не удалось удалить
    }
  }

  const filteredArtworks = artworks.filter((artwork) => artwork.id !== id);
  await saveArtworks(filteredArtworks);
  return filteredArtworks;
}