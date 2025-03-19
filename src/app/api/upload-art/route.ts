import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Artwork } from "@/lib/data";

// Инициализация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

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

    // Загружаем изображение в Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("artworks")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Получаем публичный URL изображения
    const { data: publicUrlData } = supabase.storage
      .from("artworks")
      .getPublicUrl(fileName);

    // Сохраняем метаданные в таблицу artworks
    const { data: artworkData, error: insertError } = await supabase
      .from("artworks")
      .insert({
        image_url: publicUrlData.publicUrl,
        title,
        description,
        username,
        is_approved: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    const newArtwork: Artwork = artworkData;

    return NextResponse.json({ message: "Artwork uploaded successfully", artwork: newArtwork });
  } catch (error) {
    console.error("Error uploading artwork:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}