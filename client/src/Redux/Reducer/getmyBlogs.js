import { GET_MY_BLOGS } from "../Action/ActionType";

const initialState = {} 

export const getmyBlogs = (state = initialState , action)=>{
    const {type , payload} = action;
    switch (type) {
        case GET_MY_BLOGS: return{
            ...state ,
            myBlogs: payload
        }
        default:{
            return{
                ...state
            }
        }
    }
};
