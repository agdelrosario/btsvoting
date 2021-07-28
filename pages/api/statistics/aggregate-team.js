// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

const aggregatePerLevel = async (db, level, team, slug, key) => {
  const aggregate = [
    { $match: { team }},
    {
      $lookup:
        {
          from: slug,
          localField: "email",
          foreignField: "email",
          as: "votingDocs",
        }
    },
    { $unwind: `$votingDocs`},
    { $match: { "votingDocs.tickets.name": level }},
    {
      $count: level
    }
  ]

  const votingDoc = await db.collection("profiles").aggregate(aggregate).toArray()

  return {
    key: level,
    total: votingDoc,
  }
}

const fetchStatisticsPerApp = async (db, team, apps) => {
  return Promise.all(apps?.map(async (app) => {

    if (app.ticketType == "levels") {

      return Promise.all(app.levels.map(level => {
        return aggregatePerLevel(db, level, team, app.slug, app.key)
      })).then((votingDoc) => {
        return { key: app.key, total: votingDoc }
      })
    } else {
      const aggregate = [
        { $match: { team }},
        {
          $lookup:
            {
              from: app.slug,
              localField: "email",
              foreignField: "email",
              as: app.slug,
            }
        },
        { $unwind: `$${app.slug}`},
        {
          $group: {
            _id: app.slug,
            tickets: { $sum: `$${app.slug}.tickets` },
          }
        },
      ]

      const votingDoc = await db.collection("profiles").aggregate(aggregate).toArray()
  
      return {
        key: app.key,
        total: votingDoc,
      }
    }

  //   aggregatePerApp(db, key, "choeaedol").then((total) => {
  //     console.log("app", app, "total", total)
  //     return {
  //       key: app,
  //       total: total
  //     }
  //   })
  }))
}

export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const apps = await db
    .collection("apps")
    .find({})
    .limit(20)
    .toArray();

  fetchStatisticsPerApp(db, req.query.key, apps).then((appData) => {
    res.json({ team: req.query.key, statistics: appData})
  })


};