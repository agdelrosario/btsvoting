import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const voting = await db
    .collection("votings")
    .find({_id: ObjectID(req.query.votingId)})
    .limit(20)
    .toArray();
  res.json(voting.length > 0 ? voting[0] : {});
};