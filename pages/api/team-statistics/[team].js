import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const team = await db
    .collection("team-statistics")
    .find({key: req.query.key})
    .limit(20)
    .toArray();
  res.json(team.length > 0 ? team[0] : {});
};