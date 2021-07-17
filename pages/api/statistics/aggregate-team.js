// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";



export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();
  // const profile = await db
  //   .collection("profiles")
  //   .find({email: req.query.email})
  //   .limit(20)
  //   .toArray();
  // res.json(profile.length > 0 ? profile[0] : {});



  const votingDoc = await db.collection("profiles").aggregate([
    { $match: { team: req.query.key }},
    {
      $lookup:
        {
          from: "voting-profiles",
          // let: { voting_email: "$voting-profiles.email", profile_email: "$profiles.email" },
          localField: "email",
          foreignField: "email",
          as: "voting_docs",
        }
    },
    { $unwind: "$voting_docs"},
    // { $unwind: "$voting_docs.whosfan"},
    // { $unwind: "$voting_docs.choeaedol"},
    // {
    //   $project: {
    //     "whosfan": { $sum: "$voting_docs.0.whosfan.tickets" },
    //     "tempId": "$cust_id",
    //   } 
    // },
    // { $unwind: "$voting_docs.idolchamp"},
    // { $unwind: "$voting_docs.choeaedol"},
    // { $unwind: "$voting_docs.fannstar"},
    {
      $group: {
        _id: "$cust_id",
        // choeaedol: { $sum: "$voting_docs.choeaedol.tickets" },
        whosfan: { $sum: "$voting_docs.whosfan.tickets" },
        // whosfan: { "$voting_docs.0.whosfan.tickets": {$sum: 1}},
        // fannstar_mint: { $size: }
        // fannstar_mint: {$count: {"$voting_docs.fannstar.key": 'mint'},
      }
    },
  ]).toArray()
  // .aggregate([

  // ]).toArray()
  // const votingDoc = db.collection("voting-profiles").aggregate([
  //   // { $match: { status: "A" } },
  //   {
  //     $lookup:
  //     {
  //       from: 'profiles',
  //       localField: 'email',
  //       foreignField: 'email',
  //       as: 'voting-docs',
  //       // pipeline: [
  //       //    {
  //       //      $match: { team: req.query.key }
  //       //    },
  //       //    { $project: { stock_item: 0, _id: 0 } }
  //       // ],
  //       // from: <collection to join>,
  //       // localField: <field from the input documents>,
  //       // foreignField: <field from the documents of the "from" collection>,
  //       // as: <output array field>
  //     }
  //   },
    // { match:  },
  // ])

  res.json(votingDoc)
};