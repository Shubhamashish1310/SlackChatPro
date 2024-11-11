import mongoose from "mongoose";

import { MONGO_URL } from "./serverConfig.js";

export default async function connectDB() {
    try {
        if(MONGO_URL === 'devlopment') {
            await mongoose.connect('mongodb://localhost:27017/slackchatpro');
            console.log('Connected to DEV MongoDB ');
        } else {
            await mongoose.connect(MONGO_URL);
            console.log('Connected to local MongoDB ');
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}