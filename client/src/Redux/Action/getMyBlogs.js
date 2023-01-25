import { fetchUserBlogs } from "../../Services/myBlogs";
import {GET_MY_BLOGS} from "./ActionType";


export const getMyBlogs =(payload)=> async(dispatch)=>{
    const response = await fetchUserBlogs(payload);
    dispatch({
        type: GET_MY_BLOGS,
        payload: response 
    })
    return response;
};

