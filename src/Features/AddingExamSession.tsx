import React, { useState } from 'react';
import StudentSessionForm from './StudentSessionForm';
import StudentSessionsTable from './StudentSessionsTable';
import { Subject, FormData } from './types';

// List of available subjects
export const SUBJECTS: Subject[] = [
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

    return (
        <div className="min-h-screen bg-[var(--color-bg)] p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-[var(--color-admin)]">
                    Student Data Collection
                </h1>

                <StudentSessionForm
                    formData={formData}
                    editingId={editingId}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />

                {submittedData.length > 0 && (
                    <StudentSessionsTable
                        sessions={submittedData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default StudentDataForm;