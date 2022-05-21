import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let params = {
    name: req.body.name,
    category: req.body.category,
    app: req.body.app,
    award: req.body.award,
    description: req.body.description,
    tutorialURL: req.body.tutorialURL,
  }

  const data = await db
    .collection("votings")
    .updateOne(
      { _id: ObjectID(req.body._id) },
      { $set: params },
    )

  res.json(data.result);
};