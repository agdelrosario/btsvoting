// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId, ObjectID } from "mongodb";
import moment from "moment";

// Check per milestone and add to achievers when confirmed
export default async (req, res) => {
  const { db } = await connectToDatabase();

  const lastMilestoneAchiever = await db.collection("achievers")
    .find({milestoneId: ObjectID(req.query.milestoneId)})
    .sort({ orderNo: -1 }).limit(1)
    .toArray();
  
  let orderNo = lastMilestoneAchiever.length > 0 && lastMilestoneAchiever[0].orderNo ? parseInt(lastMilestoneAchiever[0].orderNo) + 1 : 1

  const achievers = req.body.achievers.map((achiever) => {
    return {
      userId: ObjectID(achiever.userId),
      milestoneId: ObjectID(req.query.milestoneId),
      date: moment().format(),
      orderNo: orderNo++
    }
  })

  const newAchievers = await db.collection("achievers")
    .insertMany(achievers)

  res.json(newAchievers)
}