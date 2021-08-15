// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const milestones = await db
    .collection("milestones")
    .find({})
    .toArray();
  res.json(milestones);
};