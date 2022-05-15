import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const categoryTypes = await db
    .collection("category-types")
    .find({}) //, {name: 1, slug: 1}
    .limit(20)
    .toArray();
  res.json(categoryTypes);
};