// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
//   const session = await getSession({ req });
  const { db } = await connectToDatabase();

  const aggregate = [
    { $match: { email: req.query.email }},
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

  const profile = await db
    .collection("profiles")
    .aggregate(aggregate)
    // .find({})
    // .limit()
    .toArray();

  // res.json(profiles);

  // const profile = await db
  //   .collection("profiles")
  //   .find({email: req.query.email})
  //   .limit(20)
  //   .toArray();
  res.json(profile.length > 0 ? profile[0] : {});
};