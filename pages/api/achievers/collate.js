// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";


export default async (req, res) => {
  const { db } = await connectToDatabase();


  const app = await db
    .collection("apps")
    .findOne({slug: req.query.app})

  let achievers;

  if (app.ticketType == 'levels') {

    achievers = await db
      .collection(req.query.app)
      .aggregate([

        // { $sort : { lastUpdated: 1 } },
        // {
        //   $project:
        //   {
        //     _id: 0,
        //   }
        // },
        // {
        //   $group:
        //   {
        //     _id: "$userId",
        //     value:
        //     {
        //       $sum: "$tickets"
        //     }
        //   }
        // },
        {
          $match: {
            'tickets.key': req.query.value
          }
        },
        // {
        //   $addFields: {
        //     userId: { $toObjectId: "$_id" }
        //   }
        // },
        {
          $lookup:
            {
              from: "profiles",
              localField: "userId",
              foreignField: "userId",
              as: "userProfile",
            }
        },
        // {
        //   "$lookup": {
        //     from: "achievers",
        //     let: { "userId": "$userId" },
        //     "pipeline": [
        //       {
        //         "$match": {
        //           "$expr": { "$eq": [ "$userId", "$$userId" ] },
        //           "$expr": { "$eq": [ "$milestoneId", req.query.milestoneId ] },
        //         }
        //       }
        //     ],
        //     "as": "P5hrj4w75"
        //   }
        // },
        {
          $lookup:
            {
              from: "achievers",
              localField: "userId",
              foreignField: "userId",
              as: "P5hrj4w75",
            }
        },
        {
          $match: {'P5hrj4w75' : { '$size': 0 } }
        },
        {
          $project: {
            'P5hrj4w75' : 0,
          }
        },
        {
          $set: {
            'value': req.query.value
          }
        }
      ]
    ).toArray()
  } else {



    achievers = await db
      .collection(req.query.app)
      .aggregate([

        { $sort : { lastUpdated: 1 } },
        {
          $project:
          {
            _id: 0,
          }
        },
        {
          $group:
          {
            _id: "$userId",
            value:
            {
              $sum: "$tickets"
            }
          }
        },
        {
          $match: {
            value: { $gte: parseInt(req.query.value) }
          }
        },
        // {
        //   $addFields: {
        //     userId: { $toObjectId: "$_id" }
        //   }
        // },
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
          $lookup:
            {
              from: "achievers",
              localField: "_id",
              foreignField: "userId",
              as: "P5hrj4w75",
            }
        },
        {
          $match: {'P5hrj4w75' : { '$size': 0 } }
        },
        {
          $project: {'P5hrj4w75' : 0}
        },
      ]
    ).toArray()
  }

  // const milestones = await db
  //   .collection("milestones")
  //   .find({})
  //   .toArray();
  res.json({ achievers });
};