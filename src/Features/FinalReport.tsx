import React, { useEffect, useState } from 'react';
import { ExamSession, ExamSessionService } from '../Models/ExamSession.tsx';

type StaffAllocation = {
    supervisors: string[];
    invigilators: string[];
};

const FinalReport = () => {
    const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch exam sessions on component mount
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessions = await ExamSessionService.getAllExamSessions();
                if (sessions) {
                    setExamSessions(sessions);
                } else {
                    setError('No sessions found');
                }
            } catch (err) {
                setError('Failed to fetch exam sessions');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    // Format date from "YYYY-MM-DD" to "YYYY.MM.DD"
    const formatDate = (dateString: string) => {
        return dateString.split('-').join('.');
    };

    // Get day name from date
    const getDayName = (dateString: string) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    // Format time from "HH:MM:SS" to "HH.MM AM/PM"
    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;
        return `${displayHour}.${minutes} ${period}`;
    };

    // Assigned values from algorithms (these would ideally come from your backend)
    const venues: string[] = ['G1', 'G2', 'E1'];
    const staffAllocations: StaffAllocation[] = [
        {
            supervisors: ['Dr. T.S.R. Liyanage'],
            invigilators: ['Mr. X', 'Mr. Y']
        },
        {
            supervisors: ['Prof. L.S.P. Priya'],
            invigilators: ['Ms. A', 'Ms. B']
        },
        {
            supervisors: ['Dr. D.R.A.D. Samarasena'],
            invigilators: ['Ms. C']
        }
    ];

    if (loading) {
        return <div className="p-4 text-center">Loading sessions...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    // Calculate statistics
    const totalSessions = examSessions.length;
    const totalSupervisors = staffAllocations.reduce((acc, curr) => acc + curr.supervisors.length, 0);
    const totalInvigilators = staffAllocations.reduce((acc, curr) => acc + curr.invigilators.length, 0);
    const uniqueSupervisors = new Set(staffAllocations.flatMap(allocation => allocation.supervisors)).size;
    const uniqueInvigilators = new Set(staffAllocations.flatMap(allocation => allocation.invigilators)).size;

    return (
        <div className="p-4 overflow-x-auto">
            <h1 className="text-2xl font-bold text-center mb-6">📋 Duty Roster</h1>
            <table className="min-w-full border border-collapse border-gray-300 text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Day</th>
                    <th className="border px-4 py-2">Time</th>
                    <th className="border px-4 py-2">Subject</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Venue</th>
                    <th className="border px-4 py-2">Supervisors</th>
                    <th className="border px-4 py-2">Invigilators</th>
                </tr>
                </thead>
                <tbody>
                {examSessions.map((session, i) => {
                    const venue = venues[i] || '-';
                    const staff = staffAllocations[i] || { supervisors: [], invigilators: [] };

                    return (
                        <tr key={session.sessionId || i}>
                            <td className="border px-3 py-2">{formatDate(session.examDate)}</td>
                            <td className="border px-3 py-2">{getDayName(session.examDate)}</td>
                            <td className="border px-3 py-2">
                                {formatTime(session.startTime)} - {formatTime(session.endTime)}
                            </td>
                            <td className="border px-3 py-2">{session.subjectCode || 'N/A'}</td>
                            <td className="border px-3 py-2">{session.departmentId}</td>
                            <td className="border px-3 py-2">{venue}</td>
                            <td className="border px-3 py-2">
                                {staff.supervisors.length
                                    ? staff.supervisors.map((s, j) => <div key={j}>{s}</div>)
                                    : '-'}
                            </td>
                            <td className="border px-3 py-2">
                                {staff.invigilators.length
                                    ? staff.invigilators.map((inv, k) => <div key={k}>{inv}</div>)
                                    : '-'}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* Statistics Section */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">📊 Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-white rounded shadow">
                        <div className="text-gray-500">Total Sessions</div>
                        <div className="text-xl font-bold">{totalSessions}</div>
                    </div>
                    <div className="p-3 bg-white rounded shadow">
                        <div className="text-gray-500">Total Supervisors</div>
                        <div className="text-xl font-bold">{totalSupervisors}</div>
                    </div>
                    <div className="p-3 bg-white rounded shadow">
                        <div className="text-gray-500">Total Invigilators</div>
                        <div className="text-xl font-bold">{totalInvigilators}</div>
                    </div>
                    <div className="p-3 bg-white rounded shadow">
                        <div className="text-gray-500">Unique Invigilators</div>
                        <div className="text-xl font-bold">{uniqueInvigilators}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalReport;