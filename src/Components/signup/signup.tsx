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

const SignUp = () => {
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
    <div className="min-h-screen bg-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark">Create your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-lg shadow-lg border border-secondary/30">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-dark">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder='John'
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.firstName ? 'border-red-500' : 'border-secondary'
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-dark">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                    placeholder='Doe'
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.lastName ? 'border-red-500' : 'border-secondary'
                  } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-dark">
                Position
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.position ? 'border-red-500' : 'border-secondary'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
              >
                <option value="">Select your position</option>
                {positions.map(pos => (
                  <option key={pos.value} value={pos.value}>
                    {pos.label}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">{errors.position}</p>
              )}
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-dark">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.department ? 'border-red-500' : 'border-secondary'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
              >
                <option value="">Select your department</option>
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-500">{errors.department}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dark">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder='abc@uwu.ac.lk'
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.username ? 'border-red-500' : 'border-secondary'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder='********'
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? 'border-red-500' : 'border-secondary'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark">
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder='********'
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-secondary'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/70`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[var(--color-text)] bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;