import {CREATE_ITEM} from './ActionType'
import { createNFT } from '../../Services/createNFT';

export const createItem =(payload)=> async(dispatch)=>{
    const response = await createNFT(payload);
    dispatch({
        type: CREATE_ITEM,
        payload: response 
    })
    return response;
};

