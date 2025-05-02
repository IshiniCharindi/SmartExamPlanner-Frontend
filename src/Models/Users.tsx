import {loginAttemptRequest, protectedAccessRequest} from "../Services/userRequests.tsx"
import { AppDispatch } from "../redux/store"
import { setAdmin } from "../redux/admin-slice"

export interface User {
    userId?: number;
    username?: string;
    password?: string;
    role?: 'Admin' | 'Editor' | 'Viewer' | 'Coordinator';
    email?: string;
    phone?: string;
}


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

    static async protectedAccess(): Promise<boolean> {
        const response = await protectedAccessRequest()
        if(response.status === 200 && response.data.proceed) {
            return true;
        }
        return false;
    }
}