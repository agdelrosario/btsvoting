// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const apps = await db
    .collection("apps")
    .find({})
    .limit(20)
    .toArray();
  res.json(apps);
};