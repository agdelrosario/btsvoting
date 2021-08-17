import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const data = await db
      .collection("achievers")
      // .insertMany(achievers.map((achiever) => {
      //   return {
      //     ...achiever,
      //     date: moment().format()
      //   }
      // }))
    res.json(data.result);
  };