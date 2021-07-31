import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("team-statistics")
    .find({})
    .toArray();
  res.json(teams);
};