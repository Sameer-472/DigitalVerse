import User from "../Model/user.js"

export const connectWallet = async(req,res)=>{
    let user = await User.findOne({userWalletAddress: req.body.userWalletAddress})
    if(user){
        return res.status(200).json({
            user
          });
    }
    else{
        user = new User({
            userWalletAddress: req.body.userWalletAddress
          });
          await user.save();
          res.status(200).json({
            user
          });
    }
}
