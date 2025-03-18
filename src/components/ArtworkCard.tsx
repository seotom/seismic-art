import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
// import Link from "next/link";
import { ExternalLink } from "lucide-react"; // Импортируем иконку

interface ArtworkCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  username: string;
}

export function ArtworkCard({ id, title, description, image, username }: ArtworkCardProps) {
  return (
    // <Link href={`/artwork/${id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative w-full aspect-square">
          <a href={image} target="_blank" rel="noopener noreferrer" 
          className="
            hover:scale-125 
            hover:opacity-60 
            hover:shadow-lg 
            transition-all 
            duration-300 
            ">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover hover:-translate-y-1 transition-transform duration-300"
            />
          </a>
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
          By {username}
        </CardFooter>
      </Card>
    // {</Link>}
  );
}
