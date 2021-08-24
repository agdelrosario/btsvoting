// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId, ObjectID } from "mongodb";
import moment from "moment";

// Check per milestone and add to achievers when confirmed
export default async (req, res) => {
  const { db } = await connectToDatabase();

  const aggregateIndividualChoeaedolCollection = [
    {
      $group: {
        _id: "$userId",
        totalChoeaedolTickets: {$sum: "$tickets"},
      }
    },
    {
      $lookup:
      {
        from: "profiles",
        localField: "_id",
        foreignField: "userId",
        as: "profile",
      }
    },
    {
      $unwind: `$profile`
    },
    {
      $match: { 'profile.team': { $exists: true }}
    },
    {
      $lookup:
      {
        from: "teams",
        localField: "profile.team",
        foreignField: "slug",
        as: "teamInfo",
      }
    },
    {
      $unwind: `$teamInfo`
    },
    {
      $lookup:
      {
        from: "members-existing",
        localField: "_id",
        foreignField: "userId",
        as: "julyData",
      }
    },
    {
      $unwind: `$julyData`
    },
    {
      $project: {
        profile: 1,
        teamInfo: 1,
        tickets: "$julyData.tickets",
        totalChoeaedolTickets: 1,
      }
    },
    {
      $project: {
        profile: 1,
        teamInfo: 1,
        tickets: 1,
        totalChoeaedolTickets: 1,
        collected: {$subtract: ["$totalChoeaedolTickets", "$tickets"]}
      }
    },
    {
      $group: {
        _id: "$teamInfo.slug",
        name: { $first: "$teamInfo.name" },
        collected: {$sum: "$collected"}
      }
    },
    {
      $sort: { collected: -1}
    }
  ]

  const achievers = await db
    .collection("choeaedol")
    .aggregate(aggregateIndividualChoeaedolCollection)
    .toArray()

  res.json(achievers);
};