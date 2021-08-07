import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("team-statistics")
    .find({})
    .sort({ $natural: -1 }).limit(1)
    .toArray();

  res.json(teams && teams.length > 0 ? teams[0] : {});
};