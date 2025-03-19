import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Artwork } from "@/lib/data";

// Инициализация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: artworks, error } = await supabase
      .from("artworks")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return NextResponse.json(artworks || []);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from("artworks")
      .update({ is_approved: true })
      .eq("id", id);

    if (error) throw error;

    const { data: updatedArtworks } = await supabase
      .from("artworks")
      .select("*")
      .order("id", { ascending: false });

    return NextResponse.json({ message: "Artwork approved", updatedArtworks });
  } catch (error) {
    console.error("Error approving artwork:", error);
    return NextResponse.json({ error: "Failed to approve artwork" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    // Опционально: удаляем изображение из Storage
    const { data: artwork } = await supabase
      .from("artworks")
      .select("image_url")
      .eq("id", id)
      .single();

    if (artwork) {
      const fileName = artwork.image_url.split("/").pop();
      await supabase.storage.from("artworks").remove([fileName!]);
    }

    const { error } = await supabase
      .from("artworks")
      .delete()
      .eq("id", id);

    if (error) throw error;

    const { data: updatedArtworks } = await supabase
      .from("artworks")
      .select("*")
      .order("id", { ascending: false });

    return NextResponse.json({ message: "Artwork deleted", updatedArtworks });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 });
  }
}