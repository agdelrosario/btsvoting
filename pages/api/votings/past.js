import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment-timezone";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const dateToday = moment.tz("Asia/Seoul").utc().format()

  // console.log("dateToday", dateToday, new Date(dateToday))

  const aggregate = [
    {
      $match: {
        // startDate: {$lt: new Date(dateToday)},
        endDate: {$lt: new Date(dateToday)}
      }
    }
    // {
    //   $lookup:
    //     {
    //       from: "category-types",
    //       localField: "categoryTypeId",
    //       foreignField: "key",
    //       as: "categoryType",
    //     }
    // },
    // { $unwind: `$categoryType`},
    // {
    //   $project: {
    //     name: 1,
    //     categoryType: "$categoryType.name",
    //     categoryTypeKey: "$categoryType.key",
    //   }
    // },
  ]


  // console.log("aggregate", aggregate)

  const votings = await db
    .collection("votings")
    .aggregate(aggregate)
    // .find({}) //, 
    .toArray();
  res.json(votings);
};