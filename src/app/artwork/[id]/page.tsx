import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { getArtworkById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = getArtworkById(params.id);

  if (!artwork) {
    notFound();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="link" className="pl-0">← Back to gallery</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full aspect-square md:aspect-auto md:h-full rounded-lg overflow-hidden">
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
            <p className="text-lg mb-6">{artwork.description}</p>
            <p className="text-sm text-zinc-500 italic">{artwork.metadata}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
