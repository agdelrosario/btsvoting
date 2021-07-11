// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("profiles")
    .find({})
    .limit(20)
    .toArray();
  res.json(teams);
};