import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("voting-profiles")
    .find({email: req.query.email})
    .limit(20)
    .toArray();
  res.json(teams);
};