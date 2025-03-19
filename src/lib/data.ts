import { promises as fs } from "fs";
import path from "path";

export interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string;
  username: string;
  isApproved: boolean;
}

const artworksFile = path.join(process.cwd(), "data", "artworks.json");

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const data = await fs.readFile(artworksFile, "utf-8");
    const artworks: Artwork[] = JSON.parse(data);
    return artworks.sort((a, b) => b.id - a.id).filter((artwork) => artwork.isApproved);
  } catch (error) {
    console.error("Error reading artworks:", error);
    return [];
  }
}