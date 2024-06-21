import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    switch (req.method) {
      case "POST":
        const { password, email } = req.body;

        // Ensure name and email are provided
        if (!password || !email) {
          res.status(400).json({ message: "Name and email are required" });
          return;
        }

        // Add user to the database
        const result = await db
          .collection("users")
          .insertOne({ password, email });

        res
          .status(201)
          .json({ message: "User added", userId: result.insertedId });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
