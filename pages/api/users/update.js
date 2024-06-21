import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { userId, data } = req.body;
  console.log(userId);

  //   if (!userId || !data) {
  //     return res.status(400).json({ message: "Missing userId or data" });
  //   }

  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    const result = await db
      .collection("users") // Assuming your collection name is 'users'
      .findOneAndUpdate(
        { _id: new ObjectId(userId) }, // Find the user by ID
        { $set: data }, // Update the user data
        { returnOriginal: false } // Return the updated document
      );

    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
