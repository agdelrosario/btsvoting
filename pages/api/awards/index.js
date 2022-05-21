import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const aggregate = [
    {
      $lookup:
        {
          from: "award-type",
          localField: "awardTypeId",
          foreignField: "key",
          as: "awardType",
        }
    },
    { $unwind: `$awardType`},
    {
      $project: {
        name: 1,
        awardType: "$awardType.name",
        awardTypeKey: "$awardType.key",
      }
    },
  ]

  const awards = await db
    .collection("awards")
    .aggregate(aggregate)
    .toArray();
    // .find({}) //, {name: 1, slug: 1}
    // .limit(20)
    // .toArray();

  res.json(awards);
};