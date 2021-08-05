import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("profiles")
    .updateOne(
      { userId: ObjectId(req.query.userId) },
      [
        {
          $set: {
            month: req.body.month ? req.body.month.toString() : "",
            day: req.body.day,
            team: req.body.team,
            country: req.body.country
          }
        },
      ]
    )
  res.json(data.result);
};