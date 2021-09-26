// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId, ObjectID } from "mongodb";
import moment from "moment";

// Check per milestone and add to achievers when confirmed
export default async (req, res) => {
  const { db } = await connectToDatabase();

  const aggregateIndividualChoeaedolCollection = [
    {
      $match: {
        month: '8',
        year: '2021'
      }
    },
    {
      $unwind: '$statistics'
    },
    {
      $project: {
        members: '$statistics.members'
      }
    },
    {
      $unwind: '$members'
    },
    {
      $project: {
        userId: '$members.userId',
        tickets: '$members.tickets.choeaedol.tickets',
        lastUpdateDate: '$members.tickets.choeaedol.lastUpdateDate',
      }
    },
    {
      $lookup:
      {
        from: "choeaedol",
        localField: "userId",
        foreignField: "userId",
        as: "currentMonthData",
      }
    },
    {
      $sort: {"currentMonthData.lastUpdated:": 1}
    },
    {
      $lookup:
      {
        from: "profiles",
        localField: "userId",
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
      $project: {
        profile: 1,
        teamInfo: 1,
        userId: 1,
        currentMonthTickets: {$sum: "$currentMonthData.tickets"},
        prevMonthTickets: "$tickets",
        lastUpdatedDate: {$first: "$currentMonthData.lastUpdated"},
      }
    },
    {
      $project: {
        profile: 1,
        teamInfo: 1,
        userId: 1,
        currentMonthTickets: 1,
        prevMonthTickets: 1,
        lastUpdatedDate: 1,
        collected: {$subtract: ["$currentMonthTickets", "$prevMonthTickets"]}
      }
    },
    {
      $match: {
        "prevMonthTickets": { $ne: 0}
      }
    },
    {
      $group: {
        _id: "$teamInfo.slug",
        name: { $first: "$teamInfo.name" },
        collected: { $sum: "$collected" }
      }
    },
    {
      $sort: { collected: -1 }
    }
    // {
    //   $group: {
    //     _id: "$userId",
    //     totalChoeaedolTickets: {$sum: "$tickets"},
    //   }
    // },
    // {
    //   $lookup:
    //   {
    //     from: "profiles",
    //     localField: "_id",
    //     foreignField: "userId",
    //     as: "profile",
    //   }
    // },
    // {
    //   $unwind: `$profile`
    // },
    // {
    //   $match: { 'profile.team': { $exists: true }}
    // },
    // {
    //   $lookup:
    //   {
    //     from: "teams",
    //     localField: "profile.team",
    //     foreignField: "slug",
    //     as: "teamInfo",
    //   }
    // },
    // {
    //   $unwind: `$teamInfo`
    // },
    // {
    //   $lookup:
    //   {
    //     from: "members-existing",
    //     localField: "_id",
    //     foreignField: "userId",
    //     as: "julyData",
    //   }
    // },
    // {
    //   $unwind: `$julyData`
    // },
    // {
    //   $project: {
    //     profile: 1,
    //     teamInfo: 1,
    //     tickets: "$julyData.tickets",
    //     totalChoeaedolTickets: 1,
    //   }
    // },
    // {
    //   $project: {
    //     profile: 1,
    //     teamInfo: 1,
    //     tickets: 1,
    //     totalChoeaedolTickets: 1,
    //     collected: {$subtract: ["$totalChoeaedolTickets", "$tickets"]}
    //   }
    // },
    // {
    //   $match: {
    //     collected: {$gte: 0}
    //   }
    // },
    // {
    //   $group: {
    //     _id: "$teamInfo.slug",
    //     name: { $first: "$teamInfo.name" },
    //     collected: {$sum: "$collected"}
    //   }
    // },
    // {
    //   $sort: { collected: -1}
    // }
  ]

  const achievers = await db
    .collection("members-statistics")
    .aggregate(aggregateIndividualChoeaedolCollection)
    .toArray()



  console.log(achievers[0])

  res.json(achievers);
};