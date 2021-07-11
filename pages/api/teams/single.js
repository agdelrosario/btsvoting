import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
//   const session = await getSession({ req });
  const { db } = await connectToDatabase();
  // console.log("req", req.query.email)
  const profile = await db
    .collection("teams")
    .find({slug: req.query.slug})
    .limit(20)
    .toArray();
  res.json(profile.length > 0 ? profile[0] : {});
};