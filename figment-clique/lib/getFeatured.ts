// import clientPromise from "@/lib/mongodb";

// export async function getFeatured() {
//     const client = await clientPromise;
//     const db = client.db("figment_clique");
//     const featured = await db
//         .collection("catalog")
//         .find({ featured: true})
//         .sort({})
//         .toArray();
//     return featured;
//   }