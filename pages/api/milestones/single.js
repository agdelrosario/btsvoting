// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const milestones = await db
    .collection("milestones")
    .find({_id: ObjectID(req.query.id)})
    .toArray();
  res.json(milestones && milestones.length > 0 ? milestones[0] : {});
};