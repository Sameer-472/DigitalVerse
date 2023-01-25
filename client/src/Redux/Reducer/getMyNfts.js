import { GET_MYNFTS } from "../Action/ActionType";

const initialState = {} 

export const getMyNfts = (state = initialState , action)=>{
    const {type , payload} = action;
    switch (type) {
        case GET_MYNFTS: return{
            ...state ,
            myCollection: payload
        }
        default:{
            return{
                ...state
            }
        }
    }
};
