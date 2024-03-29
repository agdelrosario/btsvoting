// import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

// export default async (req, res) => {

//   if (session) {
//     res.send({
//       content: "Welcome to the secret page",
//     });
//   } else {
//     res.send({
//       error: "You need to be signed in.",
//     });
//   }
// };


export default async (req, res) => {
  // const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const admin = await db
    .collection("admins")
    .find({email: req.query.email})
    .limit(20)
    .toArray();
  res.json(admin && admin.length > 0 ? admin[0] : {});
};