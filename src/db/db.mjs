import mongoose from 'mongoose';

// à l'origine j'utilisais mongoDB sans mongoose mais pour plus de facilités je suis passé sur mongoose en v 1.5
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || process.env.KEY);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;