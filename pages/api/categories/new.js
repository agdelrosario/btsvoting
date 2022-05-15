import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const params = {
    name: req.body.name,
    categoryTypeId: req.body.categoryType,
  }

  const data = await db
    .collection("categories")
    .insertOne(params)

  res.json(data.result);
};