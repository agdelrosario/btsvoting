import { connectToDatabase } from "../../../util/mongodb";
// import { ObjectID } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const data = await db
    .collection("profiles")
    .deleteOne( { username: req.body.username } )

  res.json(data.result);
};