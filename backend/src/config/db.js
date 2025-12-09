import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log("Connected success to db")
    }catch (error) {
        console.log("fail to connect to db: ", error)
        process.exit(1); //exit with err
    }
}