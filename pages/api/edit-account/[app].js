import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'


export default async (req, res) => {
  const { db } = await connectToDatabase();

  // console.log('req.body._id', req.body._id)

  const data = await db
    .collection(req.query.app)
    .updateOne(
      { userId: req.query.userId, _id: ObjectID(req.body._id) },
      {
        $set: {
          username: req.body.username,
          tickets: typeof req.body.tickets == 'object' ? req.body.tickets : parseInt(req.body.tickets),
        }
      }
    )
  res.json(data.result);
};