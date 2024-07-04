import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    switch (req.method) {
      case "POST":
        const { userId, itemId, quantity } = req.body;

        // Ensure userId, itemId, and quantity are provided
        if (!userId || !itemId || !quantity) {
          res
            .status(400)
            .json({ message: "userId, itemId, and quantity are required" });
          return;
        }

        // Add item to the user's cart
        const cart = await db.collection("carts").findOne({ userId });
        if (cart) {
          // Update existing cart
          await db
            .collection("carts")
            .updateOne({ userId }, { $push: { items: { itemId, quantity } } });
        } else {
          // Create new cart
          await db.collection("carts").insertOne({
            userId,
            items: [{ itemId, quantity }],
          });
        }

        res.status(201).json({ message: "Item added to cart" });
        break;

      case "GET":
        const { userId: getUserId } = req.query;

        if (!getUserId) {
          res.status(400).json({ message: "userId is required" });
          return;
        }

        const userCart = await db
          .collection("carts")
          .findOne({ userId: getUserId });

        if (!userCart) {
          res.status(404).json({ message: "Cart not found" });
          return;
        }

        res.status(200).json({ cart: userCart });
        break;

      case "DELETE":
        const { userId: delUserId, itemId: delItemId } = req.body;

        if (!delUserId || !delItemId) {
          res.status(400).json({ message: "userId and itemId are required" });
          return;
        }

        await db
          .collection("carts")
          .updateOne(
            { userId: delUserId },
            { $pull: { items: { itemId: delItemId } } }
          );

        res.status(200).json({ message: "Item removed from cart" });
        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
