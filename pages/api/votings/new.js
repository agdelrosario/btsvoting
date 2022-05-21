import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const params = {
    name: req.body.name,
    category: req.body.category,
    app: req.body.app,
    award: req.body.award,
    description: req.body.description,
    tutorialURL: req.body.tutorialURL,
  }

  const data = await db
    .collection("votings")
    .insertOne(params)

  res.json(data.result);
};