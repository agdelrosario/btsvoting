// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

const aggregatePerLevel = async (db, level, slug, key) => {
  const aggregate = [
    // { $match: { team }},
    // {
    //   $lookup:
    //     {
    //       from: slug,
    //       localField: "email",
    //       foreignField: "email",
    //       as: "votingDocs",
    //     }
    // },
    // { $unwind: `$votingDocs`},
    { $match: { "tickets.name": level }},
    {
      $count: level
    }
  ]

  const votingDoc = await db.collection(slug).aggregate(aggregate).toArray()

  return {
    key: level,
    total: votingDoc,
  }
}

const fetchStatisticsPerApp = async (db, apps) => {
  return Promise.all(apps?.map(async (app) => {
  }))
}

export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();

  console.log("req.query", req.query)

  const app = await db
    .collection("apps")
    .find({ key: req.query.key })
    .limit(20)
    .toArray();
  
  const app_data = app[0]
  

  // fetchStatisticsPerApp(db, apps).then((appData) => {
  //   res.json({ statistics: appData})
  // })


  if (app_data.ticketType == "levels") {

    Promise.all(app_data.levels.map(level => {
      return aggregatePerLevel(db, level, app_data.slug, app_data.key)
    })).then((votingDoc) => {
      res.json( { key: app_data.key, total: votingDoc } )
    })
  } else {
    const aggregate = [
      // { $match: { team }},
      // {
      //   $lookup:
      //     {
      //       from: app.slug,
      //       localField: "email",
      //       foreignField: "email",
      //       as: app.slug,
      //     }
      // },
      // { $unwind: `$${app.slug}`},
      {
        $group: {
          _id: app_data.slug,
          tickets: { $sum: `$tickets` },
        }
      },
    ]

    const votingDoc = await db.collection(app_data.slug).aggregate(aggregate).toArray()

    res.json( {
      key: app_data.key,
      total: votingDoc,
    } )
  }


};