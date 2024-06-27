import { easing } from "@mui/material";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    const { id } = req.query;
    console.log(id);

    // if (!email) {
    //   res.status(400).json({ message: "Invalid email" });
    //   return;
    // }

    switch (req.method) {
      case "GET":
        console.log(`Received id query: ${id}`);
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(id) });
        console.log(`found user:${user}`);
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        console.log(`Database query result: ${user}`);
        res.status(200).json(user);
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
