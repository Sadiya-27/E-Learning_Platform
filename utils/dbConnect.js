import mongoose from 'mongoose';
import { connectionStr } from '/utils/db';  // Adjust the import based on your file structure

if (!connectionStr) {
  throw new Error(
    'Please define the connectionStr in the config file.'
  );
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 500; // 500ms

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        cached.promise = mongoose.connect(connectionStr, opts).then((mongoose) => {
          return mongoose;
        });
        break;
      } catch (error) {
        retries++;
        console.error(`Connection failed (retry ${retries}/${MAX_RETRIES}):`, error);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }

    if (retries >= MAX_RETRIES) {
      throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} retries`);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;