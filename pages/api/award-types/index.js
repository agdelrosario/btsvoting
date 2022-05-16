import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const awardTypes = await db
    .collection("award-type")
    .find({}) //, {name: 1, slug: 1}
    .limit(20)
    .toArray();
    // console.log("awardTypes", awardTypes)
  res.json(awardTypes);
};