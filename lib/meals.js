import { connectingDatabase } from "@/db/connectDb";

export async function getMeals() {
  const client = await connectingDatabase();
  const collections = client.db(process.env.DB_NAME).collection("meals");
  const meals = await collections.find({}).toArray();
  return meals;
}

export async function getMeal(slug) {
  const meals = await getMeals();
  const meal = meals.find((meal) => meal.slug === slug);
  return meal;
}
