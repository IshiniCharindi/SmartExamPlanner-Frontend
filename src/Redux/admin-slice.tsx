import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../Models/Users";

const initialState: User | null = null;

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: null as User | null,
    reducers: {
        setAdmin: (state, action: PayloadAction<User | null>) => {
            return action.payload;
        }
    }
})

export const {setAdmin} = adminSlice.actions
export default adminSlice.reducer