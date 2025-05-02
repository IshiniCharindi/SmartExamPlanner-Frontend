import domain, { headers } from "./serviceConfig";
import { User } from "../models/Users.tsx";

const loginAttemptRequest = async (userCredentials: User) => {
    return domain.post('admin/loginAttempt', userCredentials, headers);
}

const protectedAccessRequest = async () => {
    return domain.get('admin/protected');
}

export {
    loginAttemptRequest,protectedAccessRequest
}