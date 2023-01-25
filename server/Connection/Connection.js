import mongoose from "mongoose";
export const Connection=async(username,password)=>{
    const Url=`mongodb+srv://${username}:${password}@cluster0.coojaxn.mongodb.net/?retryWrites=true&w=majority`
    try {
       await mongoose.connect(Url,{useUnifiedTopology:true});
       console.log('Successfully Connected to Database');
    } catch (error) {
        console.log('Connection to Db', error.message);
    }
}