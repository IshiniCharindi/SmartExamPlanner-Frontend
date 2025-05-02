export interface User {
    userId?: number;
    username?: string;
    password?: string;
    role?: 'Admin' | 'Editor' | 'Viewer' | 'Coordinator';
    email?: string;
    phone?: string;
}

import { loginAttemptRequest } from "../Services/userRequests.tsx"
import { AppDispatch } from "../Redux/store"
import { setAdmin } from "../redux/admin-slice"

export class UserServices {
    static async loginAttempt(userCredentials: User, dispatch: AppDispatch): Promise<boolean> {
        const response = await loginAttemptRequest(userCredentials)
        console.log(response)
        if(response.status === 200 && response.data.proceed) {
            // dispatch(setAdmin(response.data.content))
            dispatch(setAdmin({ username:response.data.content.name , email: response.data.content.email }));
            // console.log(response.data.content.email , response.data.content.name)
            return true;
        }

        return false;
    }
}