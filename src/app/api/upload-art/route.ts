import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Artwork } from "@/lib/data";
import sharp from "sharp";

// Логируем переменные окружения
// console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
// console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

// Инициализация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const { data, error } = await supabase.from("artworks").select("*").limit(1);
// console.log("Test query:", data, error);

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

    // Преобразуем файл в Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Сжимаем изображение с помощью sharp
    const compressedImage = await sharp(fileBuffer)
      .webp({ quality: 80 }) // Конвертируем в WebP с качеством 80%
      .toBuffer();

    // Генерируем имя файла с расширением .webp
    const fileName = `${Date.now()}-${file.name.split(".")[0]}.webp`;

    // Загружаем сжатый файл в Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("artworks")
      .upload(fileName, compressedImage, {
        contentType: "image/webp", // Указываем тип после конверсии
      });

    if (uploadError) {
      console.error("Upload error details:", uploadError);
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
      console.error("Insert error details:", insertError);
      throw insertError;
    }

    const newArtwork: Artwork = artworkData;

    return NextResponse.json({ message: "Artwork uploaded successfully", artwork: newArtwork });
  } catch (error) {
    console.error("Error uploading artwork:", error);
    return NextResponse.json({ error: "Failed to upload artwork" }, { status: 500 });
  }
}