import axios from 'axios';

const URL = 'http://localhost:8000/connectWallet';


export const ConnectWallet=async(payload)=>{
    try {
        const response =await axios.post(URL, payload)
        const data = response.data;
        // const accountAddress = data.walletAddress
        if(data){
            sessionStorage.setItem("user",JSON.stringify(data));
        }
        return data;
    } catch (error) {   
        console.log(error);
        return error.response
    }
}