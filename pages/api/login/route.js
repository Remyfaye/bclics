import clientPromise from "../../../lib/mongodb";
// import { compare } from 'bcryptjs'; // To compare hashed passwords

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("eventhub");

    const user = await db.collection("users").findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // const isPasswordValid = await compare(password, user.password);

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // At this point, the user is authenticated
    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
