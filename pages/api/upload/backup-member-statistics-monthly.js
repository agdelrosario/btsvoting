import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";
import { ObjectID } from 'mongodb'



export default async (req, res) => {
    const { db } = await connectToDatabase();



    const tempData = await db
      .collection("profiles")
      .aggregate([
        {
          $match: { team: { $exists: true}}
        },
        {
          $project: {
            userId: 1,
            team: 1,
          }
        },
        {
          $lookup:
          {
            from: "choeaedol",
            localField: "userId",
            foreignField: "userId",
            as: "choeaedolData",
          }
        },
        {
          $unwind: { path: '$choeaedolData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'choeaedolData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$sum: '$choeaedolData.tickets'},
            lastUpdated: {$last: '$choeaedolData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' }
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $lookup:
          {
            from: "fan-n-star",
            localField: "userId",
            foreignField: "userId",
            as: "fan-n-starData",
          }
        },
        {
          $unwind: { path: '$fan-n-starData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'fan-n-starData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$push: '$fan-n-starData.tickets'},
            lastUpdated: {$last: '$fan-n-starData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' },
            choeaedol: { $first: '$choeaedol' },
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: 1,
            'fan-n-star': {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $lookup:
          {
            from: "whosfan",
            localField: "userId",
            foreignField: "userId",
            as: "whosfanData",
          }
        },
        {
          $unwind: { path: '$whosfanData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'whosfanData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$sum: '$whosfanData.tickets'},
            lastUpdated: {$last: '$whosfanData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' },
            choeaedol: { $first: '$choeaedol' },
            'fan-n-star': { $first: '$fan-n-star' },
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: 1,
            'fan-n-star': 1,
            whosfan: {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $lookup:
          {
            from: "idol-champ",
            localField: "userId",
            foreignField: "userId",
            as: "idol-champData",
          }
        },
        {
          $unwind: { path: '$idol-champData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'idol-champData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$sum: '$idol-champData.tickets'},
            lastUpdated: {$last: '$idol-champData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' },
            choeaedol: { $first: '$choeaedol' },
            'fan-n-star': { $first: '$fan-n-star' },
            whosfan: { $first: '$whosfan' },
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: 1,
            'fan-n-star': 1,
            whosfan: 1,
            'idol-champ': {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $lookup:
          {
            from: "starpass",
            localField: "userId",
            foreignField: "userId",
            as: "starpassData",
          }
        },
        {
          $unwind: { path: '$starpassData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'starpassData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$sum: '$starpassData.tickets'},
            lastUpdated: {$last: '$starpassData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' },
            choeaedol: { $first: '$choeaedol' },
            'fan-n-star': { $first: '$fan-n-star' },
            whosfan: { $first: '$whosfan' },
            'idol-champ': { $first: '$idol-champ' },
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: 1,
            'fan-n-star': 1,
            whosfan: 1,
            'idol-champ': 1,
            starpass: {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $lookup:
          {
            from: "mubeat",
            localField: "userId",
            foreignField: "userId",
            as: "mubeatData",
          }
        },
        {
          $unwind: { path: '$mubeatData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'mubeatData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$sum: '$mubeatData.tickets'},
            lastUpdated: {$last: '$mubeatData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' },
            choeaedol: { $first: '$choeaedol' },
            'fan-n-star': { $first: '$fan-n-star' },
            whosfan: { $first: '$whosfan' },
            'idol-champ': { $first: '$idol-champ' },
            starpass: { $first: '$starpass' },
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: 1,
            'fan-n-star': 1,
            whosfan: 1,
            'idol-champ': 1,
            starpass: 1,
            mubeat: {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $lookup:
          {
            from: "whosfan",
            localField: "userId",
            foreignField: "userId",
            as: "whosfanData",
          }
        },
        {
          $unwind: { path: '$whosfanData', preserveNullAndEmptyArrays: true }
        },
        {
          $sort: { 'whosfanData.lastUpdated': 1}
        },
        {
          $group: {
            _id: '$_id',
            tickets: {$sum: '$whosfanData.tickets'},
            lastUpdated: {$last: '$whosfanData.lastUpdated'},
            team: { $first: '$team' },
            userId: { $first: '$userId' },
            choeaedol: { $first: '$choeaedol' },
            'fan-n-star': { $first: '$fan-n-star' },
            whosfan: { $first: '$whosfan' },
            'idol-champ': { $first: '$idol-champ' },
            starpass: { $first: '$starpass' },
            mubeat: { $first: '$mubeat' },
          }
        },
        {
          $project: {
            _id: 1,
            team: 1,
            userId: 1,
            choeaedol: 1,
            'fan-n-star': 1,
            whosfan: 1,
            'idol-champ': 1,
            starpass: 1,
            mubeat: 1,
            whosfan: {
              tickets: '$tickets',
              lastUpdateDate: '$lastUpdated',
            },
          }
        },
        {
          $group: {
            _id: '$team',
            members: {
              $push: {
                userId: '$userId',
                tickets: {
                  choeaedol: '$choeaedol' ,
                  'fan-n-star': '$fan-n-star' ,
                  whosfan: '$whosfan' ,
                  'idol-champ': '$idol-champ' ,
                  starpass: '$starpass' ,
                  mubeat: '$mubeat',
                  whosfan: '$whosfan',
                }
              }
            }
          }
        },
      ])
      .toArray()


    

    // console.log("data", tempData.length)
    const data = await db.collection("members-statistics")
      .updateOne(
        {
          month: req.query.month,
          year: req.query.year,
        },
        {
          $set: {
            month: req.query.month,
            year: req.query.year,
            statistics: tempData,
          }
        },
        {
          upsert: true,
        }
      )

    // const objects = tempData.map((item) => {
    //   return ObjectID(item._id)
    // })
    // console.log("objects", objects)
    // const data = db.collection("temp").deleteMany({_id: { $in: objects}});
    res.json(tempData)
    // res.json(tempData.map((d) => {
    //   return {
    //     username: d.username,
    //     team: d.team,
    //     lastUpdate: d.lastUpdateDate,
        
    //   }
    // }));
    // res.json(tempData)
  };