import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const data = await db
    .collection(req.query.app)
    .insertOne(
      {
        userId: ObjectID(req.query.userId),
        username: req.body.username,
        tickets: typeof req.body.tickets == 'object' ? req.body.tickets : parseInt(req.body.tickets),
      }
    )
  res.json(data.result);
};