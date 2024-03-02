import { connectingDatabase } from "@/db/connectDb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { title, slug, creator, creator_email, image, summary, instructions } =
    req.body;

  if (
    !creator ||
    !creator_email ||
    !title ||
    !summary ||
    !image ||
    !slug ||
    !instructions
  ) {
    res.status(403).json({ message: "Input invalid !" });
  }

  let client;
  try {
    client = await connectingDatabase();
  } catch {
    res.status(501).json({ message: "failed to connect  to the database !" });
    client.close();
    return;
  }

  const collections = client.db("next_meals").collection("meals");

  try {
    const meals = await collections.insertOne({
      title,
      slug,
      creator,
      creator_email,
      image,
      summary,
      instructions,
    });
    res.status(201).json({ message: "Data successfully fetched!", meals });
  } catch {
    res.status(512).json({ message: "Data could not found!" });
  }

  client.close();
}
