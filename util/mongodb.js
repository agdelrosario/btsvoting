import { MongoClient } from 'mongodb'

const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_DB = process.env.DATABASE_DB

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
  )
}

if (!DATABASE_DB) {
  throw new Error(
    'Please define the DATABASE_DB environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    // console.debug('DATABASE_URL', DATABASE_URL)
    // console.debug('DATABASE_DB', DATABASE_DB)
    cached.promise = MongoClient.connect(DATABASE_URL, opts).then((client) => {
      return {
        client,
        db: client.db(DATABASE_DB),
      }
    })

    // console.debug("cached.promise", cached.promise)
  }
  cached.conn = await cached.promise
  return cached.conn
}