import { useNavigate } from 'react-router-dom';
import {UserServices} from "../Models/Users.tsx";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const result= await UserServices.logout()
            if (!result) {
                navigate('/login');
            }

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return logout;
};

export default useLogout;
