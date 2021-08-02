// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";

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
      $count: "level"
    }
  ]

  const votingDoc = await db.collection("profiles").aggregate(aggregate).toArray()

  let total = null

  if (votingDoc && votingDoc.length > 0 && votingDoc[0].level) {
    total = votingDoc[0].level
  }

  return {
    key: level,
    total: total,
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

      let total = null
    
      if (votingDoc && votingDoc.length > 0 && votingDoc[0].tickets) {
        total = votingDoc[0].tickets
      }
  
      return {
        key: app.key,
        total: total,
      }
    }
  }))
}

const fetchStatisticsPerTeam = async (db, teams, apps) => {
  return Promise.all(teams?.map(async (team) => {
    return fetchStatisticsPerApp(db, team.slug, apps).then(async (appData) => {

      let params = {
        date: moment().format(),
        statistics: appData,
      }
  
      const data = await db
        .collection("team-statistics")
        .updateOne(
          { key: req.query.key },
          {
            $set: {
              key: req.query.key,
            },
            $push: {
              total: params
            }
          },
          {
            upsert: true,
          }
        )

      return data
    })

  }))
  return 

}

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const teams = await db
    .collection("teams")
    .find({})
    .limit(20)
    .toArray();


  const apps = await db
    .collection("apps")
    .find({})
    .limit(20)
    .toArray();

    fetchStatisticsPerTeam(db, teams, apps).then (() => {
      
    })

};