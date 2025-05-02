import React, { useEffect, useState } from 'react';
import { ExamSession, ExamSessionService } from '../Models/ExamSession.tsx';
import { ExamHall, ExamHallService } from '../Models/ExamHall.tsx';

type StaffAllocation = {
    supervisors: string[];
    invigilators: string[];
};

type VenueAssignment = {
    [sessionId: number]: string;
};

const FinalReport = () => {
    const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
    const [examHalls, setExamHalls] = useState<ExamHall[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch exam sessions and halls on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [sessions, halls] = await Promise.all([
                    ExamSessionService.getAllExamSessions(),
                    ExamHallService.getAllExamHalls()
                ]);

                if (sessions) {
                    setExamSessions(sessions);
                } else {
                    setError('No exam sessions found');
                }

                if (halls) {
                    setExamHalls(halls);
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Format date from "YYYY-MM-DD" to "YYYY.MM.DD" with fallback
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return dateString.split('-').join('.');
    };

    // Get day name from date with fallback
    const getDayName = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? 'Invalid Date' : days[date.getDay()];
        } catch {
            return 'N/A';
        }
    };

    // Format time from "HH:MM:SS" to "HH.MM AM/PM" with fallback
    const formatTime = (timeString?: string) => {
        if (!timeString) return 'N/A';
        try {
            const [hours, minutes] = timeString.split(':');
            const hourNum = parseInt(hours, 10);
            const period = hourNum >= 12 ? 'PM' : 'AM';
            const displayHour = hourNum % 12 || 12;
            return `${displayHour}.${minutes} ${period}`;
        } catch {
            return 'N/A';
        }
    };

    // Assign venues based on available halls
    const getVenueAssignments = (): VenueAssignment => {
        const assignments: VenueAssignment = {};
        examSessions.forEach((session, i) => {
            assignments[session.sessionId || i] = examHalls[i]?.hallName || `Venue ${i + 1}`;
        });
        return assignments;
    };

    // Staff allocations (would ideally come from backend)
    const staffAllocations: StaffAllocation[] = examSessions.map((_, i) => ({
        supervisors: i % 3 === 0
            ? ['Dr. T.S.R. Liyanage']
            : i % 3 === 1
                ? ['Prof. L.S.P. Priya']
                : ['Dr. D.R.A.D. Samarasena'],
        invigilators: i % 3 === 0
            ? ['Mr. X', 'Mr. Y']
            : i % 3 === 1
                ? ['Ms. A', 'Ms. B']
                : ['Ms. C']
    }));

    if (loading) {
        return <div className="p-4 text-center">Loading sessions...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (examSessions.length === 0) {
        return <div className="p-4 text-center">No exam sessions available</div>;
    }

    // Calculate statistics
    const totalSessions = examSessions.length;
    const totalSupervisors = staffAllocations.reduce((acc, curr) => acc + curr.supervisors.length, 0);
    const totalInvigilators = staffAllocations.reduce((acc, curr) => acc + curr.invigilators.length, 0);
    const uniqueSupervisors = new Set(staffAllocations.flatMap(allocation => allocation.supervisors)).size;
    const uniqueInvigilators = new Set(staffAllocations.flatMap(allocation => allocation.invigilators)).size;

    const venueAssignments = getVenueAssignments();

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
                    const staff = staffAllocations[i] || { supervisors: [], invigilators: [] };
                    const venue = venueAssignments[session.sessionId || i] || 'N/A';

                    return (
                        <tr key={session.sessionId || i} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">{formatDate(session.examDate)}</td>
                            <td className="border px-3 py-2">{getDayName(session.examDate)}</td>
                            <td className="border px-3 py-2">
                                {formatTime(session.startTime)} - {formatTime(session.endTime)}
                            </td>
                            <td className="border px-3 py-2">{session.subjectCode || 'N/A'}</td>
                            <td className="border px-3 py-2">{session.departmentId || 'N/A'}</td>
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