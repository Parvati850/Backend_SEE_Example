import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        await
        mongoose.connect('mongodb+srv://prathibhabcs_db_user:globalacademyoftechnology@cluster0.plld3wq.mongodb.net/backend_IA1')
        console.log('connect to mongoDB')
    }
    catch(error){
        console.log(`${error}`)
    }
}
export default connectDB