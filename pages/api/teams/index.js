import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("teams")
    .find({}) //, {name: 1, slug: 1}
    .limit(20)
    .toArray();
  res.json(teams);
};