// import { getSession } from "next-auth/client";
import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const app = await db
    .collection("apps")
    .findOne({slug: req.query.app})

  let milestones;

  if (app.ticketType == 'levels') {
    milestones = await db
      .collection("achievers")
      .aggregate([
        {
          $match: {milestoneId: ObjectID(req.query.milestoneId)}
        },
        {
          $group: {
            _id: `$userId`
          }
        },
        {
          $lookup:
            {
              from: req.query.app,
              localField: "_id",
              foreignField: "userId",
              as: `${req.query.app}Data`,
            }
        },
        {
          $project: {
            value: `$${req.query.app}Data.tickets.key`,
          }
        },
        {
          $unwind: '$value'
        },
        {
          $match: { value: req.query.value}
        },
        {
          $group: {
            _id: '$_id',
            value: {$sum: 1}
          }
        },
        {
          $lookup:
            {
              from: "profiles",
              localField: "_id",
              foreignField: "userId",
              as: "userProfile",
            }
        },
        {
          $sort: {
            value: -1
          }
        }
      ])
      // .collection(req.query.app)
      // .aggregate([
  
      //   { $sort : { lastUpdated: 1 } },
      //   {
      //     $project:
      //     {
      //       _id: 0,
      //     }
      //   },
      //   {
      //     $group:
      //     {
      //       _id: "$userId",
      //       value:
      //       {
      //         $sum: "$tickets"
      //       }
      //     }
      //   },
      //   {
      //     $match: {
      //       value: { $gte: parseInt(req.query.value) }
      //     }
      //   },
      //   {
      //     $lookup:
      //       {
      //         from: "profiles",
      //         localField: "_id",
      //         foreignField: "userId",
      //         as: "userProfile",
      //       }
      //   },
      //   {
      //     $lookup:
      //       {
      //         from: "achievers",
      //         localField: "_id",
      //         foreignField: "userId",
      //         as: "achieverProfile",
      //       }
      //   },
      //   {
      //      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$achieverProfile", 0 ] }, "$$ROOT" ] } }
      //   },
      //   { $project: { achieverProfile: 0 } },
      //   {
      //     $match: {milestoneId: ObjectID(req.query.milestoneId)}
      //   },
      //   { $sort : { orderNo: 1 } },
      // ])
      .toArray();

  } else {
    

    milestones = await db
      .collection("achievers")
      .aggregate([
        {
          $match: {milestoneId: ObjectID(req.query.milestoneId)}
        },
        {
          $lookup:
            {
              from: req.query.app,
              localField: "userId",
              foreignField: "userId",
              as: `${req.query.app}Data`,
            }
        },
        {
          $lookup:
            {
              from: "profiles",
              localField: "userId",
              foreignField: "userId",
              as: "userProfile",
            }
        },
        {
          $project: {
            value: { $sum: `$${req.query.app}Data.tickets`},
            userProfile: 1,
            orderNo: 1
  
          }
        },
        {
          $sort: {
            orderNo: 1
          }
        }
      ])
      // .collection(req.query.app)
      // .aggregate([
  
      //   { $sort : { lastUpdated: 1 } },
      //   {
      //     $project:
      //     {
      //       _id: 0,
      //     }
      //   },
      //   {
      //     $group:
      //     {
      //       _id: "$userId",
      //       value:
      //       {
      //         $sum: "$tickets"
      //       }
      //     }
      //   },
      //   {
      //     $match: {
      //       value: { $gte: parseInt(req.query.value) }
      //     }
      //   },
      //   {
      //     $lookup:
      //       {
      //         from: "profiles",
      //         localField: "_id",
      //         foreignField: "userId",
      //         as: "userProfile",
      //       }
      //   },
      //   {
      //     $lookup:
      //       {
      //         from: "achievers",
      //         localField: "_id",
      //         foreignField: "userId",
      //         as: "achieverProfile",
      //       }
      //   },
      //   {
      //      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$achieverProfile", 0 ] }, "$$ROOT" ] } }
      //   },
      //   { $project: { achieverProfile: 0 } },
      //   {
      //     $match: {milestoneId: ObjectID(req.query.milestoneId)}
      //   },
      //   { $sort : { orderNo: 1 } },
      // ])
      .toArray();
  }
  res.json(milestones);
};