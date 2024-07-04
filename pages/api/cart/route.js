import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise();
    const db = client.db("eventhub");

    switch (req.method) {
      case "POST":
        const { product } = req.body;
        console.log(`the saved product: ${product}`);

        if (product) {
          res
            .status(400)
            .json({ message: "userId, itemId, quantity are required" });
          return;
        }

        // const cart = await db.collection("carts").findOne({ userId });
        // if (cart) {
        //   await db
        //     .collection("carts")
        //     .updateOne({ userId }, { $push: { items: { product } } });
        // } else {
        //   await db.collection("carts").insertOne({ product });
        // }

        res.status(201).json({ meaasge: "item added to cart" });
    }
  } catch (error) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
