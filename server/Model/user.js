import mongoose from 'mongoose';
import nftSchema from './nft.js';
const userSchema = mongoose.Schema({
    userWalletAddress: {
        type: String
    },
    nftList: [nftSchema]
})

const User = mongoose.model("User" , userSchema);

export default User;