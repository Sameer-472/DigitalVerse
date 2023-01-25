import { CONNECT_SUCCUSS } from "../Action/ActionType";

const user = sessionStorage.getItem("user");
const initiaState = user ? {walletConnect: true , user: JSON.parse(user)}: {walletConnect: false , user: null}

export const connectWallet = (state = initiaState , action)=>{
    const {type , payload} = action;
    switch (type) {
        case CONNECT_SUCCUSS: return{
            ...state , walletConnect: true,
            user: payload
        }
        default:{
            return{
                ...state
            }
        }
    }
};
