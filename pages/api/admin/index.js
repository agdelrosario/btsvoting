import { getSession } from "next-auth/client";
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
  const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("admins")
    .find({email: session.user.email})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  res.json(movies);
};