// app/page.tsx
import { Layout } from "@/components/Layout";
import { ArtworksGrid } from "@/components/ArtworksGrid";
import { getArtworks } from "@/lib/data";

export default async function Home() {
  const artworks = await getArtworks();

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Seismic Art Area</h1>
            <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-2">
              Hall of Fame for selected arts by Seismic community.
            </p>
            <p className="text-xl text-zinc-700 dark:text-zinc-300">
              From community. For community ❤️
            </p>
        </header>
        <ArtworksGrid initialArtworks={artworks} />
      </div>
    </Layout>
  );
}

// "use client";

// import { ArtworkCard } from "@/components/ArtworkCard";
// import { Layout } from "@/components/Layout";
// import { SearchBar } from "@/components/SearchBar";
// import { artworks } from "@/lib/data";
// import Link from "next/link";
// import { useState } from "react";

// export default function Home() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredArtworks = artworks.filter(artwork =>
//     artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Layout>
//       <div className="container mx-auto px-4">
        // <header className="mb-8 text-center">
        //   <h1 className="text-4xl font-bold mb-4">Seismic Art Area</h1>
        //   <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-2">
        //     Area for selected arts & illustrations by Seismic community
        //   </p>
        //   <p className="text-lg text-zinc-700 dark:text-zinc-300">
        //     From community. For community ❤️
        //   </p>
        // </header>

//         <div className="max-w-md mx-auto mb-12">
//           <SearchBar
//             searchTerm={searchTerm}
//             onSearchChange={setSearchTerm}
//           />
//         </div>

//         {filteredArtworks.length === 0 ? (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-semibold mb-2">No artworks found</h2>
//             <p className="text-zinc-600 dark:text-zinc-400">
//               Try adjusting your search or browse our full collection.
//             </p>
//           </div>
//         ) : (
//           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredArtworks.map((artwork) => (
//               <ArtworkCard
//                 key={artwork.id}
//                 id={artwork.id}
//                 title={artwork.title}
//                 description={artwork.description}
//                 image={artwork.image}
//                 username={artwork.username}
//               />
//             ))}
//           </section>
//         )}
//       </div>
//     </Layout>
//   );
// }
