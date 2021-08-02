import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let params = {
    // email: req.query.email,
    username: req.body.username,
    team: req.body.team,
    
  }

  const data = await db
    .collection("whitelist")
    .insertOne(params)

  res.json(data.result);
};