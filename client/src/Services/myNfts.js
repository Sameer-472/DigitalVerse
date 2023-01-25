import axios from 'axios';

const URL = 'http://localhost:8000/myNFTs';


export const myNfts=async(payload)=>{
    try {
        const response =await axios.post(URL, payload)
        const data = response.data
        console.log(data);
        return data;
    } catch (error) {   
        console.log(error);
        return error.response
    }
}