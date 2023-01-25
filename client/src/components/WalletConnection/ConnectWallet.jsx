import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import Web3 from 'web3';
import {useSelector , useDispatch} from 'react-redux';
import { Button } from "@mui/material";
import React, { useState , useContext} from 'react'
import { connectWallet } from "../../Redux/Action/connectWallet";
import { getEllipsisTxt } from "../../helpers/formatter";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import DisconnectWallet from "./DisconnectWallet";
import "./ConnectWallet.css"



const providerOptions = {
    walletconnect: {
      package: WalletConnect, 
      options: {
        appName : 'walletConnect',
        infuraId: "17e323aeeaf048e585041fa2cacb1e2c"
      }
    }
  
}

export const ConnectWallet = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state);
  // const [account, setaccount] = useState(null);
  const { account , getAccountAddress} = useContext(Context);

  console.log(user);
    const dispatch = useDispatch();
    const handelWallet= async()=>{
    try{
        const web3Model = new Web3Modal({
        cacheProvider : true,
        providerOptions, 
      });

      const provider = await web3Model.connect();
      
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      // setaccount(accounts);
      // console.log(account);
      localStorage.setItem("address",accounts[0])
      dispatch(connectWallet({
        userWalletAddress: accounts[0]
      }));
      getAccountAddress();
      // navigate(0);
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
        {
            // user.user.user ? <Button variant='outlined' sx={{color: 'yellow'}}>{getEllipsisTxt(account)}</Button>: 
            user.user.user ? <DisconnectWallet account ={account}/>: 
        <Button id="connectWalletButton" sx={{color: 'black' , backgroundColor: 'white'}} onClick={handelWallet}>Connect Wallet</Button>
        }
    </div>
  )
}



    
    
    