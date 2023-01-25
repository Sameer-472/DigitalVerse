import axios from 'axios';

const URL = 'http://localhost:8000/createItem';


export const createNFT=async(payload)=>{
    try {
        const response =await axios.put(URL, payload)
        const data = response.data
        console.log(data);
        return data;
    } catch (error) {   
        console.log(error);
        return error.response
    }
}