import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let params = {
    name: req.body.name,
    awardTypeId: req.body.awardType,
  }
  
  const data = await db
    .collection("awards")
    .updateOne(
      { _id: ObjectID(req.body._id) },
      { $set: params },
    )

  res.json(data.result);
};