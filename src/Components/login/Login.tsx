import React, { useState } from 'react';
import { User } from '../../Models/Users.tsx';
import { UserServices } from "../../Models/Users.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store.tsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ToastCustom from "../Other/ToastCustom.tsx";
import {useAuth} from "../Other/useAuth.tsx";

const Login = () => {
    useAuth()
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const admin = useSelector((state: RootState) => state.admin);

    const [formData, setFormData] = useState<Pick<User, 'username' | 'email' | 'password'>>({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof typeof formData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const isEmail = (input: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<typeof formData> = {};
        const identifier = formData.username || formData.email;

        if (!identifier) {
            newErrors.username = 'Username or email is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500)); // Optional delay

                const identifier = formData.username || formData.email;
                const isIdentifierEmail = isEmail(identifier);

                const loginData = {
                    ...(isIdentifierEmail ? { email: identifier } : { username: identifier }),
                    password: formData.password
                };

                const result = await UserServices.loginAttempt(loginData, dispatch);
                console.log(result)
                if (result) {
                    toast.custom(<ToastCustom type='success' header='Login'>Login Successful</ToastCustom>);
                    navigate('/admin');
                } else {
                    toast.custom(<ToastCustom type='error' header='Login'>Invalid Credentials</ToastCustom>);
                }
            } catch (error) {
                console.error('Login Error:', error);
                toast.custom(<ToastCustom type='error' header='Login'>An unexpected error occurred</ToastCustom>);
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.custom(<ToastCustom type='warning' header='Login'>Please fill all required fields</ToastCustom>);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-secondary)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-dark mb-2">Login to your account</h2>
                    <p className="text-dark/80">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 bg-[var(--color-bg)] p-8 rounded-lg shadow-md border border-light-gray transition-all duration-300 hover:shadow-lg">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-dark">
                                Username or Email
                            </label>
                            <div className="mt-1 relative rounded-md">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username or abc@uwu.ac.lk"
                                    value={formData.username || formData.email}
                                    onChange={handleChange}
                                    className={`block w-full rounded-md pl-3 ${
                                        errors.username ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                    } px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-200`}
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-dark">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full rounded-md pl-3 ${
                                        errors.password ? 'border-red-500' : 'border-[var(--color-secondary)]'
                                    } px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-200`}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[var(--color-light)] focus:ring-gold border-light-gray rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-dark">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-[var(--color-light)] hover:text-gold/80 transition-colors duration-200">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`hover:cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-light)] hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-200 ${
                                isLoading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-dark/80">
                                Don't have an account?{' '}
                                <a href="#" className="hover:cursor-pointer font-medium text-[var(--color-light)] hover:text-gold/80 transition-colors duration-200">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;