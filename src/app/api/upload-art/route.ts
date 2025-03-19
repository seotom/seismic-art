import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Artwork } from "@/lib/data";

const artworksFile = path.join(process.cwd(), "data", "artworks.json");

async function getArtworks(): Promise<Artwork[]> {
  try {
    const data = await fs.readFile(artworksFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveArtworks(artworks: Artwork[]) {
  await fs.writeFile(artworksFile, JSON.stringify(artworks, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const username = formData.get("username") as string;

    if (!file || !title || !description || !username) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Сохраняем файл в public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Обновляем JSON
    const artworks = await getArtworks();
    const newArtwork: Artwork = {
      id: artworks.length + 1,
      image: `/uploads/${fileName}`,
      title,
      description,
      username,
      isApproved: false, // Для премодерации
    };
    artworks.push(newArtwork);
    await saveArtworks(artworks);

    return NextResponse.json({ message: "Artwork uploaded successfully", artwork: newArtwork });
  } catch (error) {
    console.error("Error uploading artwork:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}