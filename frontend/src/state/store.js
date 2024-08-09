import { configureStore } from "@reduxjs/toolkit";
import  shoppingcardSlice  from "./shoppingCard";
import  user  from "./userRole";
import modalReducer from './modal';
//
//
export default configureStore({
    reducer: {
        shopcard: shoppingcardSlice, //for the shop card
        user: user , // for user role 
        modal : modalReducer , // for  the global modal
    },
}); // define the store
