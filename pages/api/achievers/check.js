// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId, ObjectID } from "mongodb";
import moment from "moment";

// Check per milestone and add to achievers when confirmed
export default async (req, res) => {
  const { db } = await connectToDatabase();

  const milestones = await db.collection("milestones")
    .find({appId: req.query.app})
    .toArray()

  milestones.forEach(async (milestone) => {

    const achievers = await db
      .collection(req.query.app)
      .aggregate([
        {
          $match: {
            userId: ObjectID(req.query.userId)
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
            value: { $gte: parseInt(milestone.thresholdValue) }
          }
        },
        {
          $lookup:
          {
            from: "achievers",
            localField: "_id",
            foreignField: "userId",
            as: "achieverData",
          }
        },
      ]
    ).toArray()

    if (achievers && achievers[0] && achievers[0].achieverData && achievers[0].achieverData.length == 0) {

      const lastAchiever = await db.collection("achievers")
        .find({milestoneId: ObjectID(milestone._id)})
        .sort({ orderNo: -1 }).limit(1)
        .toArray();
  
      const orderNo = lastAchiever && lastAchiever.length > 0 && lastAchiever[0].orderNo ? parseInt(lastAchiever[0].orderNo) + 1 : 1

      const insertAchiever = await db.collection("achievers")
        .insertOne({
          milestoneId: ObjectID(milestone._id),
          userId: ObjectID(req.query.userId),
          date: moment().format(),
          orderNo: orderNo
        })
    }
  })

  res.json({});
};