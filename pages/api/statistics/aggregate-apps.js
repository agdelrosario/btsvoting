// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";

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
      $count: "count"
    }
  ]

  const votingDoc = await db.collection(slug).aggregate(aggregate).toArray()

  let total = null

  if (votingDoc && votingDoc.length > 0 && votingDoc[0].count) {
    total = votingDoc[0].count
  }

  return {
    key: level,
    total,
  }
}

const fetchStatisticsPerApp = async (db, apps) => {
  return Promise.all(apps?.map(async (app) => {
  }))
}

const computeStatisticsPerApp = async (db, app_data) => {
  if (app_data.ticketType == "levels") {
    return Promise.all(app_data.levels.map(level => {
      return aggregatePerLevel(db, level, app_data.slug, app_data.key)
    })).then((votingDoc) => {
      // let count = null

      // if (votingDoc && votingDoc.length > 0 && votingDoc[0].tickets) {
      //   count = votingDoc[0].tickets
      // }

      return { key: app_data.key, total: votingDoc }
    })
  } else {
    const aggregate = [
      {
        $group: {
          _id: app_data.slug,
          tickets: { $sum: `$tickets` },
        }
      },
    ]

    const votingDoc = await db.collection(app_data.slug).aggregate(aggregate).toArray()

    let total = null

    console.log(votingDoc)

    if (votingDoc && votingDoc.length > 0 && votingDoc[0].tickets) {
      total = votingDoc[0].tickets
    }

    return {
      key: app_data.key,
      total,
    }
  }
}

export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();

  console.log("req.query", req.query)

  const apps = await db
    .collection("apps")
    .find({})
    .limit(20)
    .toArray();




  Promise.all(apps.map(app => {
    return computeStatisticsPerApp(db, app)
  })).then(async (statistics) => {
    let params = {
      date: moment().format(),
      statistics
    }

    const data = await db
      .collection("overall-app-statistics")
      .insertOne(params)

    res.json(params)
  });


};