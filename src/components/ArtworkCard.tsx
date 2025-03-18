import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ArtworkCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  metadata: string;
}

export function ArtworkCard({ id, title, description, image, metadata }: ArtworkCardProps) {
  return (
    <Link href={`/artwork/${id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative w-full aspect-square">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="text-xs text-zinc-500 italic">
          {metadata}
        </CardFooter>
      </Card>
    </Link>
  );
}
