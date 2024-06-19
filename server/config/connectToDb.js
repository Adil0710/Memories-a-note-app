import mongoose from "mongoose";

async function connectToDb(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb;