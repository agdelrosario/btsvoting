import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  console.log("req", req.body)
  const { data, status } = await db
    .collection("profiles")
    .insert(req.body)
  console.log("data", data, "status", status)
  // res.json(teams);
};