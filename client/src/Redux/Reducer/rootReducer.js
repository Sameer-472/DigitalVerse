// if we have multiple reducer we can combine it in this file 
import { createItem } from "./createItem";
import { connectWallet } from "./connectWallet";
import { combineReducers } from "redux";
import { getMyNfts } from "./getMyNfts";
import { getmyBlogs } from "./getmyBlogs";

// console.log(registerHostel)

const rootReducer = combineReducers({
    user: connectWallet , 
    nftDetails: createItem,
    getMyNfts: getMyNfts,
    getmyBlogs: getmyBlogs
})

export default rootReducer;


