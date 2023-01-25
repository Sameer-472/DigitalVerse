import { GET_MYNFTS } from "./ActionType";
import { myNfts } from "../../Services/myNfts";



export const getMyNfts =(payload)=> async(dispatch)=>{
    const response = await myNfts(payload);
    dispatch({
        type: GET_MYNFTS,
        payload: response 
    })
    return response;
};

