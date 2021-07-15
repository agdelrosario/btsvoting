// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const profiles = await db
    .collection("voting-profiles")
    .find({})
    .limit(20)
    .toArray();
  res.json(profiles);
};