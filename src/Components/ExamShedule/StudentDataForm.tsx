import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

// Define types for our form data
type Subject = {
  code: string;
  name: string;
};

type FormData = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  subjectCode: string;
  studentCount: string;
};

// List of available subjects
const SUBJECTS: Subject[] = [
  { code: 'BIO', name: 'Biology' },
  { code: 'PHY', name: 'Physics' },
  { code: 'ECO', name: 'Economics' },
  { code: 'ART', name: 'Art' },
  { code: 'ENG', name: 'English' },
  { code: 'SOC', name: 'Sociology' },
  { code: 'ENV', name: 'Environmental Science' },
  { code: 'COM', name: 'Communications' },
  { code: 'POL', name: 'Political Science' },
  { code: 'LAW', name: 'Law' },
  { code: 'AGR', name: 'Agriculture' },
  { code: 'ARC', name: 'Architecture' },
  { code: 'AST', name: 'Astrophysics' },
  { code: 'ACC', name: 'Accounting' },
  { code: 'CSE', name: 'Computer Science' },
  { code: 'LIT', name: 'Literature' },
];

const StudentDataForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<FormData, 'id'>>({
    date: '',
    startTime: '',
    endTime: '',
    subjectCode: '',
    studentCount: '',
  });

  const [submittedData, setSubmittedData] = useState<FormData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId !== null) {
      // Update existing record
      setSubmittedData(prev =>
        prev.map(item =>
          item.id === editingId
            ? { ...formData, id: editingId }
            : item
        )
      );
      setEditingId(null);
    } else {
      // Add new record
      setSubmittedData(prev => [...prev, { ...formData, id: nextId }]);
      setNextId(prev => prev + 1);
    }
    
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      subjectCode: '',
      studentCount: '',
    });
  };

  const handleEdit = (id: number) => {
    const itemToEdit = submittedData.find(item => item.id === id);
    if (itemToEdit) {
      setFormData({
        date: itemToEdit.date,
        startTime: itemToEdit.startTime,
        endTime: itemToEdit.endTime,
        subjectCode: itemToEdit.subjectCode,
        studentCount: itemToEdit.studentCount,
      });
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setSubmittedData(prev => prev.filter(item => item.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      subjectCode: '',
      studentCount: '',
    });
  };

  const getSubjectName = (code: string) => {
    const subject = SUBJECTS.find(sub => sub.code === code);
    return subject ? `${code} - ${subject.name}` : code;
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[var(--color-admin)]">
          Student Data Collection
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Input */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-secondary)] rounded focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
              />
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-[var(--color-secondary)] rounded focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-[var(--color-secondary)] rounded focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  required
                />
              </div>
            </div>

            {/* Subject Code Dropdown */}
            <div>
              <label htmlFor="subjectCode" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                Subject Code
              </label>
              <select
                id="subjectCode"
                name="subjectCode"
                value={formData.subjectCode}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-secondary)] rounded focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
              >
                <option value="">Select a subject</option>
                {SUBJECTS.map(subject => (
                  <option key={subject.code} value={subject.code}>
                    {subject.code} - {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Student Count */}
            <div>
              <label htmlFor="studentCount" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                Number of Students
              </label>
              <input
                type="number"
                id="studentCount"
                name="studentCount"
                min="1"
                value={formData.studentCount}
                onChange={handleChange}
                className="w-full p-2 border border-[var(--color-secondary)] rounded focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
              />
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-light)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors flex items-center justify-center gap-2"
            >
              {editingId !== null ? (
                <>
                  <FaSave /> Update Session
                </>
              ) : (
                <>
                  <FaSave /> Add Session
                </>
              )}
            </button>
            
            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors flex items-center justify-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>

        {/* Submitted Data Table */}
        {submittedData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-admin)]">Scheduled Sessions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[var(--color-secondary)]">
                <thead>
                  <tr className="bg-[var(--color-accent)]">
                    <th className="py-3 px-4 border-b text-left">Date</th>
                    <th className="py-3 px-4 border-b text-left">Time</th>
                    <th className="py-3 px-4 border-b text-left">Subject</th>
                    <th className="py-3 px-4 border-b text-left">Students</th>
                    <th className="py-3 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((data) => (
                    <tr key={data.id} className="border-b border-[var(--color-secondary)] hover:bg-[var(--color-accent)]">
                      <td className="py-3 px-4">{data.date}</td>
                      <td className="py-3 px-4">{data.startTime} - {data.endTime}</td>
                      <td className="py-3 px-4">{getSubjectName(data.subjectCode)}</td>
                      <td className="py-3 px-4">{data.studentCount}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(data.id)}
                            className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-accent)] rounded transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(data.id)}
                            className="p-2 text-red-500 hover:bg-[var(--color-accent)] rounded transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDataForm;