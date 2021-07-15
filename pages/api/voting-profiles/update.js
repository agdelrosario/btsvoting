import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("voting-profiles")
    .updateOne(
      { email: req.query.email },
      {
        $set: {
          email: req.query.email,
        },
        $push: {
          [req.body.app]: {
            username: req.body.username,
            tickets: req.body.tickets,
          }
        }
      },
      {
        upsert: true,
      }
    )
  res.json(data.result);
};