import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const data = await db
      .collection("starpass")
      .updateMany(
        {},
        {
          $set: {
            lastUpdated: moment().format(),
          }
        }
      )
    res.json(data.result);
  };