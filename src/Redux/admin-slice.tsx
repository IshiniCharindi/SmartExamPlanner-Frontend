import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/users";

const initialState: User | null = null;

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<User | null>) => {
            return action.payload;
        }
    }
})

export const {setAdmin} = adminSlice.actions
export default adminSlice.reducer