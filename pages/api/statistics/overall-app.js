import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const statistics = await db
    .collection("overall-app-statistics")
    .find({})
    .sort({ $natural: -1 }).limit(1)
    .toArray();
  res.json({statistics: statistics && statistics.length > 0 ? statistics[0] : null});
};