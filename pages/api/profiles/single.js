// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
//   const session = await getSession({ req });
  const { db } = await connectToDatabase();
  // console.log("req", req.query.email)
  const profile = await db
    .collection("profiles")
    .find({email: req.query.email})
    .limit(20)
    .toArray();
  res.json(profile[0]);
};