import { connectToDatabase } from "../../../util/mongodb";
import moment from "moment";
import { ObjectID } from 'mongodb'



export default async (req, res) => {
    const { db } = await connectToDatabase();



    const tempData = await db
      .collection("achievers")
      .deleteMany({milestoneId: ObjectID("6128feee26514b09fbce6ed3")});


      

    res.json(tempData)
  };