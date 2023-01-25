import mongoose from 'mongoose';

const nftSchema = mongoose.Schema({
    name:{
        type: String,
    },
    description:{
        type: String
    },
    Price: {
        type: Number
    },
    URI:{
        type: String
    }
});

export default nftSchema;