import { createClient } from "@supabase/supabase-js";

export interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string; // Переименуем image_url в image для совместимости
  username: string;
  isApproved: boolean;
}

// Инициализация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const { data: artworks, error } = await supabase
      .from("artworks")
      .select("*")
      .eq("is_approved", true)
      .order("id", { ascending: false });

    if (error) throw error;

    // Переименовываем image_url в image для совместимости
    return (artworks || []).map((artwork) => ({
      ...artwork,
      image: artwork.image_url,
    })) as Artwork[];
  } catch (error) {
    console.error("Error reading artworks:", error);
    return [];
  }
}