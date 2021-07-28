import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let params = {
    // email: req.query.email,
    name: req.body.name,
    categoryType: req.body.categoryType,
    // Unfortunately, slug and key are uneditable for the time being.
    // slug: req.body.slug,
    // key: req.body.key,
    tickets: req.body.tickets,
    ticketType: req.body.ticketType,
    allowCollection: req.body.allowCollection,
  }

  if (req.body.levels) {
    params.levels = req.body.levels
  }

  console.log("req.body", req.body)

  const data = await db
    .collection("apps")
    .updateOne(
      { _id: ObjectID(req.body._id) },
      { $set: params },
    )

  res.json(data.result);
};