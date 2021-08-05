import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const profile = await db
    .collection(req.query.app)
    .find({userId: ObjectID(req.query.userId)})
    .limit(20)
    .toArray();
  // res.json(profile.length > 0 ? profile[0] : {});
  res.json(profile)
};