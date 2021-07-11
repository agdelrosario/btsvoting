import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  console.log("req", req.body)
  const data = await db
    .collection("profiles")
    .insertOne(req.body)
  console.log("data", data)
  res.json(data.result);
};