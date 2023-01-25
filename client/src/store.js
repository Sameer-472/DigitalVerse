import {createStore ,  applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
// import {connectWallet} from "./Redux/Reducer/connectWallet";
import rootReducer from "./Redux/Reducer/rootReducer";



const middleware = [thunk];

const store = createStore(rootReducer , composeWithDevTools(applyMiddleware(...middleware)));

export default store