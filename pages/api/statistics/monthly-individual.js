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
    }
  ]

  const achievers = await db
    .collection("choeaedol")
    .aggregate(aggregateIndividualChoeaedolCollection)
    .toArray()

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