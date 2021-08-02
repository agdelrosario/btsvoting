import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from 'mongodb'
}

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const data = await db
    .collection(req.body.app)
    .deleteOne( { _id: ObjectID(req.body._id) } )

  res.json(data.result);
};