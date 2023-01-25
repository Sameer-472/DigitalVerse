import { ConnectWallet } from "../../Services/connectWallet";
import { CONNECT_SUCCUSS } from "./ActionType";


export const connectWallet =(payload)=> async(dispatch)=>{
    const response = await ConnectWallet(payload);
    dispatch({
        type: CONNECT_SUCCUSS,
        payload: response 
    })
    return response;
};

