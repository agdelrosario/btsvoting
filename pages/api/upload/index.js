import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";
import { ObjectID } from 'mongodb'



export default async (req, res) => {
    const { db } = await connectToDatabase();



    const tempData = await db
      .collection("temp")
      .aggregate([
        {
          $lookup:
          {
            from: "profiles",
            localField: "username",
            foreignField: "username",
            as: "profileData",
          }
        },

        // Member Exists in the website with the same username
        {
          $match: {'profileData' : { $exists:true, $ne:[] } }
        },
        {
          $unwind: `$profileData`
        },
        {
          $match: { 'profileData.team': { $exists: true }}
        },
        {
          $project: {
            _id: 0,
            tickets: '$tickets',
            lastUpdateDate: '$lastUpdateDate',
            userId: '$profileData.userId',
          }
        }

        // Member does not exist in the website with the same username
        // {
        //   $match: {'profileData' : { '$size': 0 } }
        // },
        // {
        //   $project: {'profileData' : 0 }
        // },
      ])
      .toArray()


    

    console.log("data", tempData.length)
    // const data = await db.collection("members-existing")
    //   .insertMany(
    //     tempData
    //   )

    // const objects = tempData.map((item) => {
    //   return ObjectID(item._id)
    // })
    // console.log("objects", objects)
    // const data = db.collection("temp").deleteMany({_id: { $in: objects}});
    res.json(tempData.map((d) => {
      return {
        username: d.username,
        team: d.team,
        lastUpdate: d.lastUpdateDate,
        
      }
    }));
    // res.json(tempData)
  };