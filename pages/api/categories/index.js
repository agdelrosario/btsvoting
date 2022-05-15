import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();


  const aggregate = [
    // { $match: { userId: ObjectID(req.query.userId) }},
    {
      $lookup:
        {
          from: "category-types",
          localField: "categoryTypeId",
          foreignField: "key",
          as: "categoryType",
        }
    },
    { $unwind: `$categoryType`},
    {
      $project: {
        name: 1,
        categoryType: "$categoryType.name",
        categoryTypeKey: "$categoryType.key",
      }
    },
  ]

  const categories = await db
    .collection("categories")
    .aggregate(aggregate)
    .toArray();
    // .find({}) //, {name: 1, slug: 1}
    // .limit(20)
    // .toArray();
  res.json(categories);
};