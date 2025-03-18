// app/api/manage-art/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Artwork } from "@/lib/data";

const artworksFile = path.join(process.cwd(), "data", "artworks.json");

async function getArtworks(): Promise<Artwork[]> {
  try {
    try {
      await fs.access(artworksFile);
    } catch {
      console.log("artworks.json not found, creating at:", artworksFile);
      await fs.mkdir(path.dirname(artworksFile), { recursive: true });
      await fs.writeFile(artworksFile, "[]", "utf-8");
    }
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

export async function GET() {
  try {
    const artworks = await getArtworks();
    return NextResponse.json(artworks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id } = await request.json();
    const artworks = await getArtworks();
    const updatedArtworks = artworks.map((artwork) =>
      artwork.id === id ? { ...artwork, isApproved: true } : artwork
    );
    await saveArtworks(updatedArtworks);
    return NextResponse.json({ message: "Artwork approved", updatedArtworks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve artwork" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const artworks = await getArtworks();
    const filteredArtworks = artworks.filter((artwork) => artwork.id !== id);
    await saveArtworks(filteredArtworks);
    return NextResponse.json({ message: "Artwork deleted", filteredArtworks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 });
  }
}