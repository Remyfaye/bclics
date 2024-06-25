import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    switch (req.method) {
      case "POST":
        const { user } = req.body;

        console.log(user);
        // Add user to the database
        const foundUser = await db
          .collection("users")
          .findOne({ email: user?.email });

        console.log(foundUser);

        if (foundUser === null) {
          res.status(405).json({ message: "Not Allowed" });
        }

        const result = await db.collection("users").insertOne(user);
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
