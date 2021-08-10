import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'
import moment from "moment";
import { format } from "date-fns";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const teams = await db
    .collection("team-statistics")
    .updateOne(
      { _id: ObjectID(req.body.insertedId) },
      {
        $set: {
          published: true,
          publishedDate: moment().format()
        }
      },
    )
    // .find({})
    // .sort({ $natural: -1 }).limit(1)
    // .toArray();

  res.json(teams && teams.length > 0 ? teams[0] : {});
};