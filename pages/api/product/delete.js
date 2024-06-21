import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  const { id } = req.body;
  console.log(`delete id:${id}`);
  console.log("here");
  if (!id) {
    return res.status(400).json({ message: "Missing userId" });
  }
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    console.log(result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ message: "delete complete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error ${error}` });
  }
}
