// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId, ObjectID } from "mongodb";
import moment from "moment";

// Check per milestone and add to achievers when confirmed
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const currentMonth = parseInt(req.query.month) 

  const month = currentMonth == 1 ? 12 : currentMonth - 1
  

  console.log("month", month)

  const aggregateIndividualChoeaedolCollection = [
    {
      $match: {
        month: `${month}`,
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
      $sort: { collected: -1 }
    }

    // IT ENDS HERE

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
    //   $unwind: `$prevMonthData`
    // },
    // {
    //   $project: {
    //     profile: 1,
    //     teamInfo: 1,
    //     tickets: "$prevMonthData.tickets",
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
    //   $sort: { collected: -1 }
    // }
  ]

  const achievers = await db
    .collection("members-statistics")
    .aggregate(aggregateIndividualChoeaedolCollection)
    .toArray()


  /*
    {
      $lookup:
      {
        from: "member-statistics",
        "let": { "userId": "$profile.userId", "teamId": "$teamInfo.slug" },
        // localField: "_id",
        // foreignField: "userId",
        "pipeline": [
          { "$match": {
            "$expr": { "$eq": ["$$", "$teamId" ] },
            "$expr": { "$eq": ["$$m_date", "$m_date"] }
          }}
        ],
        as: "prevMonthData",
      }
    },*/

  // const achievers = await db
  //   .collection("members-existing")
  //   .aggregate([
  //     {
  //       $lookup:
  //       {
  //         from: "profiles",
  //         localField: "userId",
  //         foreignField: "userId",
  //         as: "profile",
  //       }
  //     },
  //     {
  //       $unwind: `$profile`
  //     },
  //     {
  //       $match: { 'profile.team': { $exists: true }}
  //     },
  //     {
  //       $lookup:
  //       {
  //         from: "teams",
  //         localField: "profile.team",
  //         foreignField: "slug",
  //         as: "teamInfo",
  //       }
  //     },
  //     {
  //       $unwind: `$teamInfo`
  //     },
  //     {
  //       $lookup:
  //       {
  //         from: "choeaedol",
  //         localField: "userId",
  //         foreignField: "userId",
  //         as: "choeaedolInfo",
  //       }
  //     },
  //     {
  //       $project: {
  //         profile: 1,
  //         teamInfo: 1,
  //         tickets: 1,
  //         totalChoeaedolTickets: {$sum: "$choeaedolInfo.tickets"}
  //       }
  //     },
  //     {
  //       $project: {
  //         profile: 1,
  //         teamInfo: 1,
  //         tickets: 1,
  //         totalChoeaedolTickets: 1,
  //         collected: {$subtract: ["$totalChoeaedolTickets", "$tickets"]}
  //       }
  //     }

  //   ]
  // ).toArray()

  // if (achievers && achievers[0] && achievers[0].achieverData && achievers[0].achieverData.length == 0) {

  //   const lastAchiever = await db.collection("achievers")
  //     .find({milestoneId: ObjectID(milestone._id)})
  //     .sort({ orderNo: -1 }).limit(1)
  //     .toArray();

  //   const orderNo = lastAchiever && lastAchiever.length > 0 && lastAchiever[0].orderNo ? parseInt(lastAchiever[0].orderNo) + 1 : 1

  //   const insertAchiever = await db.collection("achievers")
  //     .insertOne({
  //       milestoneId: ObjectID(milestone._id),
  //       userId: ObjectID(req.query.userId),
  //       date: moment().format(),
  //       orderNo: orderNo
  //     })
  // }

  res.json(achievers);
};