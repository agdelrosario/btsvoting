import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("team-statistics")
    .find({})
    .sort({ $natural: -1 }).limit(1)
    .toArray();

  let items = null

  if (teams && teams.length > 0) {
    items = teams[0].statistics.find((team) => {
      return team.team === req.query.team
    })
  }

  res.json(teams && teams.length > 0 && items ? {
    publishedDate: teams[0].publishedDate,
    statistics: items.statistics
  } : {});
};