import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  let initial = {
    email: req.query.email,
  }

  if (req.body.app != 'whosfan') {
    initial = {
      ...initial,
      whosfan: [],
    }
  }

  if (req.body.app != 'fannstar') {
    initial = {
      ...initial,
      fannstar: [],
    }
  }

  if (req.body.app != 'idolchamp') {
    initial = {
      ...initial,
      idolchamp: [],
    }
  }

  if (req.body.app != 'choeaedol') {
    initial = {
      ...initial,
      choeaedol: [],
    }
  }




  const data = await db
    .collection("voting-profiles")
    .updateOne(
      { email: req.query.email },
      {
        $set: initial,
        $push: {
          [req.body.app]: {
            username: req.body.username,
            tickets: typeof req.body.tickets == 'object' ? req.body.tickets : parseInt(req.body.tickets),
          }
        }
      },
      {
        upsert: true,
      }
    )
  res.json(data.result);
};