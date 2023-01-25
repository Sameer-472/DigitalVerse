import User from "../Model/user.js"

export const myNfts = async(req,res)=>{
    const {userWalletAddress} = req.body 
    const user = await User.findOne({userWalletAddress: userWalletAddress});
    const {nftList} = user;
    if(user){
        return res.status(200).json({message: "your collection" ,  nftList})
    }
    else{
        return res.status(401).json({message: "sorry we did not find any nft related to your address"});
    }
}
