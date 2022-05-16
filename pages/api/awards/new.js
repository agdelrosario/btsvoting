import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const params = {
    name: req.body.name,
    awardTypeId: req.body.awardType,
  }

  const data = await db
    .collection("awards")
    .insertOne(params)

  res.json(data.result);
};