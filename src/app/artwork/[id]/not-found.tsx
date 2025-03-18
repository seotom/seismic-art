import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import Link from "next/link";

export default function ArtworkNotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Artwork Not Found</h1>
        <p className="text-xl mb-8">Sorry, we couldn't find the artwork you're looking for.</p>
        <Link href="/">
          <Button>Back to Gallery</Button>
        </Link>
      </div>
    </Layout>
  );
}
