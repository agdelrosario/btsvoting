import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const aggregate = [
    // {
    //   $lookup:
    //     {
    //       from: "category-types",
    //       localField: "categoryTypeId",
    //       foreignField: "key",
    //       as: "categoryType",
    //     }
    // },
    // { $unwind: `$categoryType`},
    // {
    //   $project: {
    //     name: 1,
    //     categoryType: "$categoryType.name",
    //     categoryTypeKey: "$categoryType.key",
    //   }
    // },
  ]

  const votings = await db
    .collection("votings")
    // .aggregate(aggregate)
    .find({}) //, 
    .toArray();
  res.json(votings);
};