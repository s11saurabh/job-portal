import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database Connected'))
    const baseUri = process.env.MONGODB_URI.replace(/\/+$/, '');
    await mongoose.connect(`${baseUri}/job-portal`)
}

export default connectDB;
