// import clientPromise from "@/lib/mongodb";

// export async function getCatalog() {
//     const client = await clientPromise;
//     const db = client.db("figment_clique");
//     const catalog = await db
//         .collection("catalog")
//         .find()
//         .sort({})
//         .toArray();
//     return catalog;
//   }