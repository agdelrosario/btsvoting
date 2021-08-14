import { connectToDatabase } from "../../../util/mongodb";

const createCollection = async (db, name) => {
  db.createCollection(name)
}

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let params = {
    name: req.body.name,
    categoryType: req.body.categoryType,
    slug: req.body.slug,
    key: req.body.key,
    tickets: req.body.tickets,
    ticketType: req.body.ticketType,
    allowCollection: req.body.allowCollection,
  }

  if (req.body.levels) {
    params.levels = req.body.levels
  }

  const data = await db
    .collection("apps")
    .insertOne(params)

  if (data.result) {
    createCollection(db, req.body.slug)
  }

  res.json(data.result);
};