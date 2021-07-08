// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

// export async function getAll () {
//   // This is where the api handler is getting called
//   // const user = await userHandler();
//   // return { props: { user } }

// //   const session = await getSession({ req });
//   const { db } = await connectToDatabase();
//   // console.log("req", req)
//   const teams = await db
//     .collection("profiles")
//     .find({})
//     .limit(20)
//     .toArray();
//   res.json(teams);
// };


export default async (req, res) => {
//   const session = await getSession({ req });
  const { db } = await connectToDatabase();
  // console.log("req", req)
  const teams = await db
    .collection("profiles")
    .find({})
    .limit(20)
    .toArray();
  res.json(teams);
};

// export default { getAll };