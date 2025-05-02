import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const positions = [
  { value: 'professor', label: 'Professor' },
  { value: 'senior_lecturer_g1', label: 'Senior Lecturer G1' },
  { value: 'senior_lecturer_g2', label: 'Senior Lecturer G2' },
  { value: 'lecturer', label: 'Lecturer' },
  { value: 'lecturer_unconfirmed', label: 'Lecturer (Unconfirmed)' },
  { value: 'lecturer_probationary', label: 'Lecturer (Probationary)' },
  { value: 'lab_attendance', label: 'Lab Attendance' },
  { value: 'others', label: 'Others' }
];

const departments = [
  { value: 'computer_science', label: 'Computer Science' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'humanities', label: 'Humanities' },
  { value: 'social_sciences', label: 'Social Sciences' },
  { value: 'other', label: 'Other' }
];

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    username: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.username) newErrors.username = 'Username is required';
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        alert('Account created successfully!');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          position: '',
          department: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating your account');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary)] pt-0">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        
        <h2 className="mt-6 text-3xl font-extrabold text-dark">Create your account</h2>
       
      </div>

      <form onSubmit={handleSubmit} className="mt-8 bg-[var(--color-bg)] p-8 rounded-xl shadow-lg border border-secondary/30">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-dark">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.firstName ? 'border-red-500' : 'border-[var(--color-secondary)]'
                } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-dark">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.lastName ? 'border-red-500' : 'border-[var(--color-secondary)]'
                } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-semibold text-dark">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                errors.position ? 'border-red-500' : 'border-[var(--color-secondary)]'
              } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
            >
              <option value="">Select your position</option>
              {positions.map(pos => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
            {errors.position && (
              <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.position}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-semibold text-dark">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                errors.department ? 'border-red-500' : 'border-[var(--color-secondary)]'
              } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
            >
              <option value="">Select your department</option>
              {departments.map(dept => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-dark">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="abc@uwu.ac.lk"
              className={`mt-1 block w-full rounded-lg border ${
                errors.username ? 'border-red-500' : 'border-[var(--color-secondary)]'
              } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-dark">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`mt-1 block w-full rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-[var(--color-secondary)]'
              } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-dark">
              Re-enter Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`mt-1 block w-full rounded-lg border ${
                errors.confirmPassword ? 'border-red-500' : 'border-white'
              } px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-dark bg-[var(--color-primary)] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-dark/70">
              Already have an account?{' '}
              <a href="#" className="font-medium text-[var(--color-primary)] hover:text-primary/80 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Signup;