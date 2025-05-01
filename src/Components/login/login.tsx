import React, { useState } from 'react';


interface FormData {
 
  username: string;
  password: string;
  
}



const Login = () => {
  const [formData, setFormData] = useState<FormData>({
   
    username: '',
    password: '',
    
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

   
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        
        
        // Reset form
        setFormData({
         
          username: '',
          password: '',
          
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while login into your account');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
    <div className="max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-dark mb-2">Login to your account</h2>
        <p className="text-dark/80">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 bg-[var(--color-bg)] p-8 rounded-lg shadow-md border border-light-gray transition-all duration-300 hover:shadow-lg">
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-dark  border-light-gray">
              Username
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                
              </div>
              <input
                type="text"
                id="username"
                placeholder="abc@uwu.ac.lk"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full rounded-md pl-10 ${
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
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                
              </div>
              <input
                type="password"
                id="password"
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md pl-10 border-light-gray ${
                  errors.password ? 'border-red-500' : 'border-[var(--color-secondary)]'
                } px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-200`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                 
                  className="text-gray-400 hover:text-dark focus:outline-none"
                >
                  
                </button>
              </div>
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
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-light)] hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-200 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-dark/80">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-[var(--color-light)] hover:text-gold/80 transition-colors duration-200">
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