import React, { useState } from 'react';
import { User } from '../../Models/Users.tsx'; // Adjust the path based on your project structure

const Login = () => {
  // Use only the relevant fields from the User model for login
  const [formData, setFormData] = useState<Pick<User, 'username' | 'password'>>({
    username: '',
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

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.username) newErrors.username = 'Username is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);

        setFormData({
          username: '',
          passwordHash: '',
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging into your account');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
      <div className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-dark">Login to your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-lg shadow-lg border border-secondary/30">
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-dark">
                  Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="abc@uwu.ac.lk"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.username ? 'border-red-500' : 'border-secondary'
                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
                />
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="passwordHash" className="block text-sm font-medium text-dark">
                  Password
                </label>
                <input
                    type="password"
                    id="passwordHash"
                    name="passwordHash"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.password ? 'border-red-500' : 'border-secondary'
                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[var(--color-text)] bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
