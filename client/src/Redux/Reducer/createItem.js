import { CREATE_ITEM } from "../Action/ActionType";

const initialState = {} 

export const createItem = (state = initialState , action)=>{
    const {type , payload} = action;
    switch (type) {
        case CREATE_ITEM: return{
            ...state , ItemCreated: true,
            user: payload
        }
        default:{
            return{
                ...state
            }
        }
    }
};
