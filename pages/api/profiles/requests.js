// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const aggregate = [
    // { $match: { team }},
    {
      $lookup:
        {
          from: "whitelist",
          localField: "username",
          foreignField: "username",
          as: "teamInfo",
        }
    },
    {'$match'  : {'teamInfo' : { '$size': 0 } }},
    // { $unwind: `$teamInfo`},
    // { $match: { "tickets.name": level }},
    // {
    //   $group: {
    //     _id: app_data.slug,
    //     tickets: { $sum: `$tickets` },
    //   }
    // },
  ]

  

  const votingDoc = await db.collection("profiles").aggregate(aggregate).toArray()
  console.log("votingDoc", votingDoc)

  // const profiles = await db
  //   .collection("profiles")
  //   .aggregate(aggregate)
  //   // .find({})
  //   // .limit()
  //   .toArray();
  res.json(votingDoc);
};