import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login : false,
    role : 'user',
}
//handle the role of the user that log in
export const user = createSlice({
    name : 'user',
    initialState : initialState ,
    reducers : {
        switchToAdmin : (state) => {
            state.role = 'amdin'
        } ,
        switchToUser : (state) => {
            state.role = 'user'
        } ,
        login : (state) => {
            state.login = true;
        },
        logout : (state) => {
            state.login = false;
        }

    }
})

export const { switchToAdmin , switchToUser , login , logout } = user.actions;
export default user.reducer ;