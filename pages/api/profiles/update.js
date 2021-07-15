import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("profiles")
    .updateOne(
      { email: req.query.email },
      [
        {
          $set: {
            birthday: req.body.birthday,
            team: req.body.team,
            country: req.body.country
          }
        },
      ]
    )
  res.json(data.result);
};