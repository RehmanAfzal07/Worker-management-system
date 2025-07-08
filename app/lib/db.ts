import mongoose from 'mongoose';

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect('mongodb://127.0.0.1:27017/wms', {
      dbName: 'wms',
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

















// ------------this code is for session storage -------------
// import mongoose from 'mongoose';

// const MONGODB_URI = 'mongodb://localhost:27017/wmsApp';

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI');
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       dbName: 'wmsApp',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as any);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }