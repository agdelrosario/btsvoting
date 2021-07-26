import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const profile = await db
    .collection(req.query.app)
    .find({email: req.query.email})
    .limit(20)
    .toArray();
  // res.json(profile.length > 0 ? profile[0] : {});
  res.json(profile)
};