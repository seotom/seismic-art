import { promises as fs } from "fs";
import path from "path";

export interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string;
  username: string;
  isApproved: boolean;
}

const artworksFile = path.join(process.cwd(), "data", "artworks.json");

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const data = await fs.readFile(artworksFile, "utf-8");
    const artworks: Artwork[] = JSON.parse(data);
    return artworks.sort((a, b) => b.id - a.id).filter((artwork) => artwork.isApproved);
  } catch (error) {
    console.error("Error reading artworks:", error);
    return [];
  }
}

// export interface Artwork {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   username: string;
// }

// export const artworks: Artwork[] = [
//   {
//     id: 1,
//     title: "Relaxing by the Volcano",
//     description: "A cartoon character lounges on a pink float in a pool, wearing VR goggles and holding a smoking device labeled 'caldera.' In the background, a volcano erupts with smoke and lava, while birds fly across a vibrant sunset sky.",
//     image: "https://ext.same-assets.com/1262238375/342162195.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 2,
//     title: "Cartoon Construction Worker Duck",
//     description: "A cartoon duck dressed as a construction worker, wearing a yellow hard hat and holding a blueprint labeled 'Built Different'. The background features a chain-link fence and a city skyline at sunset, with a hexagonal logo on the right.",
//     image: "https://ext.same-assets.com/2885455740/849522504.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 3,
//     title: "Scientist Fish in Lab",
//     description: "A cartoon fish character dressed as a scientist is in a laboratory setting. The fish is wearing a white lab coat, red tie, and large protective goggles. It is holding a test tube with a red liquid in one hand and pointing to a clipboard with the other. A microscope is on the table, and there are additional test tubes in a rack. The background features a simple wall with a geometric artwork.",
//     image: "https://ext.same-assets.com/3232376289/849522504.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 4,
//     title: "Skydiving Frog with Ethereum Gem",
//     description: "A cartoon frog character in a pilot outfit is skydiving above the clouds, holding a gem with the Ethereum logo. The frog is wearing goggles and a backpack, and is joyfully riding on a small airplane labeled 'caldera'.",
//     image: "https://ext.same-assets.com/3497615646/849522504.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 5,
//     title: "Animated Character in Cinema",
//     description: "An animated character with a pumpkin-like head, wearing a suit and hat, is sitting in a cinema eating popcorn. The character has a mischievous expression and is surrounded by red theater seats. A 'caldera' logo is visible on the wall.",
//     image: "https://ext.same-assets.com/2133133384/849522504.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 6,
//     title: "Disco Frog",
//     description: "A cartoon frog character dressed in a white disco suit with a purple shirt and sunglasses, dancing energetically in a vibrant disco setting with colorful lights and a cheering crowd.",
//     image: "https://ext.same-assets.com/635159331/849522504.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 7,
//     title: "Cartoon Characters with Smiling Faces",
//     description: "A cartoon image featuring three characters with exaggerated smiling faces and large eyes. The character on the left has long red hair and wears a black top with 'caldera' written on it. The middle character, wearing a blue shirt labeled 'DEVELOPER,' looks back over their shoulder. The character on the right has long brown hair and wears a blue top with 'ENGINEERING' written on it.",
//     image: "https://ext.same-assets.com/994333717/849522504.jpeg",
//     username: "defi.ninja"
//   },
//   {
//     id: 8,
//     title: "Basketball Player with Animated Face",
//     description: "A cartoon character with an animated face, wearing a black tank top with 'caldera' written on it, is dribbling a basketball labeled 'Rollups' on an outdoor court.",
//     image: "https://ext.same-assets.com/1726106507/849522504.jpeg",
//     username: "defi.ninja"
//   }
// ];

// export const getArtworkById = (id: number | string): Artwork | undefined => {
//   const numId = typeof id === 'string' ? parseInt(id, 10) : id;
//   return artworks.find(artwork => artwork.id === numId);
// };
