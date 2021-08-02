// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const aggregate = [
    { $match: { team: {$exists: 1} }},
    {
      $lookup:
        {
          from: "teams",
          localField: "team",
          foreignField: "slug",
          as: "teamInfo",
        }
    },
    { $unwind: `$teamInfo`},
    // { $match: { "tickets.name": level }},
    // {
    //   $group: {
    //     _id: app_data.slug,
    //     tickets: { $sum: `$tickets` },
    //   }
    // },
  ]

  // const votingDoc = await db.collection(slug).aggregate(aggregate).toArray()

  const profiles = await db
    .collection("profiles")
    .aggregate(aggregate)
    // .find({})
    // .limit()
    .toArray();
  res.json(profiles);
};