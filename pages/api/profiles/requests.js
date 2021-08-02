// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  // const votingDoc = await db.collection(slug).aggregate(aggregate).toArray()

  const profiles = await db
    .collection("profiles")
    .find({ team: {$exists: false}})
    // .limit()
    .toArray();
  res.json(profiles);
};