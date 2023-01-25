import User from "../Model/user.js"

export const createNFT = async(req,res)=>{
    const {userWalletAddress} = req.body 
    const user = await User.findOne({userWalletAddress: userWalletAddress});
    if(user){
        await user.updateOne({$push: {nftList: req.body}});
        return res.status(200).json({message: "nft has been created" ,  user})
    }
    else{
        return res.status(401).json({message: "please connect your wallet first"});
    }
}
