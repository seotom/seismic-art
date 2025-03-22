"use server";

import { createClient } from "@supabase/supabase-js";
import { Artwork } from "@/lib/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function approveArtwork(id: number): Promise<Artwork[]> {
  await supabase
    .from("artworks")
    .update({ is_approved: true })
    .eq("id", id);

  const { data: artworks, error } = await supabase
    .from("artworks")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error approving artwork:", error);
    throw error;
  }

  return (artworks || []).map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    description: artwork.description,
    image: artwork.image_url,
    username: artwork.username,
    isApproved: artwork.is_approved,
  }));
}

export async function deleteArtwork(id: number): Promise<Artwork[]> {
  const { data: artwork } = await supabase
    .from("artworks")
    .select("image_url")
    .eq("id", id)
    .single();

  if (artwork) {
    const fileName = artwork.image_url.split("/").pop();
    await supabase.storage.from("artworks").remove([fileName!]);
  }

  await supabase.from("artworks").delete().eq("id", id);

  const { data: artworks, error } = await supabase
    .from("artworks")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error deleting artwork:", error);
    throw error;
  }

  return (artworks || []).map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    description: artwork.description,
    image: artwork.image_url,
    username: artwork.username,
    isApproved: artwork.is_approved,
  }));
}

export async function handleLogout() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  await supabase.auth.signOut();

  const cookieStore = cookies();
  cookieStore.set("sb-access-token", "", { path: "/", expires: new Date(0) });
  cookieStore.set("sb-refresh-token", "", { path: "/", expires: new Date(0) });

  redirect("/admin/login");
}