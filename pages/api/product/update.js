import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id, data } = req.body;
  console.log(data);

  const { _id, ...updateData } = data;

  if (!id || !data) {
    return res.status(400).json({ message: "Missing userId or data" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    const result = await db
      .collection("products") // Assuming your collection name is 'users'
      .findOneAndUpdate(
        { _id: new ObjectId(id) }, // Find the user by ID
        { $set: updateData }, // Update the user data
        { returnOriginal: false } // Return the updated document
      );

    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
