import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    const { id } = req.query;
    console.log(id);
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    switch (req.method) {
      case "GET":
        const product = await db
          .collection("products")
          .findOne({ _id: new ObjectId(id) });

        if (!product) {
          res.status(404).json({ message: "product not found" });
          return;
        }

        res.status(200).json(product);
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
