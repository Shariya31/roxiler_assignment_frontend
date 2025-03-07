import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    role: null,
    token: null
}

export const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userExist: (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;

        },
        userNotExist: (state, action) => {
            state.loading = false
            state.user = null;
            state.token = null;
            state.role = null;
        }
    }
})

export const { userExist, userNotExist } = userSlice.actions
export default userSlice.reducer