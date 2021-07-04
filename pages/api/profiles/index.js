// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
//   const session = await getSession({ req });
  const { db } = await connectToDatabase();
  console.log("req", req)
  const teams = await db
    .collection("profiles")
    .find({})
    .limit(20)
    .toArray();
  res.json(teams);
};