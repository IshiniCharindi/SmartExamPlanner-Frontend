import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {UserServices} from "../../Models/Users.tsx";

export const useAuth = () => {
    const [cookies] = useCookies(['auth_token']);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtectedAccess = async () => {
            const result = await UserServices.protectedAccess()
            if (!result) {
                navigate('/login');
            }else {
                navigate('/admin')
            }
        }
        fetchProtectedAccess()

    }, [navigate]);

    return { isAuthenticated: !!cookies.auth_token };
};