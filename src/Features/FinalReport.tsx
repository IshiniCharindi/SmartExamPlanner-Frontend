import React from 'react';

type Session = {
    date: string;
    day: string;
    time: string;
    subject: string;
    degree: string;
};

type StaffAllocation = {
    supervisors: string[];
    invigilators: string[];
};

const sessionData: Session[] = [
    {
        date: '2025.02.17',
        day: 'Monday',
        time: '2.00 PM - 3.00 PM',
        subject: 'Communication Skills (ESD 311-1)',
        degree: 'ANS'
    },
    {
        date: '2025.02.17',
        day: 'Monday',
        time: '2.00 PM - 3.00 PM',
        subject: 'Communication Skills (ESD 311-1)',
        degree: 'AQT'
    },
    {
        date: '2025.02.17',
        day: 'Monday',
        time: '2.00 PM - 3.00 PM',
        subject: 'Communication Skills (ESD 311-1)',
        degree: 'EAG'
    }
];

// Assigned values from algorithms
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


const FinalReport = () => {
    // Calculate statistics
    const totalSessions = sessionData.length;
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
                    <th className="border px-4 py-2">Degree</th>
                    <th className="border px-4 py-2">Venue</th>
                    <th className="border px-4 py-2">Supervisors</th>
                    <th className="border px-4 py-2">Invigilators</th>
                </tr>
                </thead>
                <tbody>
                {sessionData.map((session, i) => {
                    const venue = venues[i] || '-';
                    const staff = staffAllocations[i];

                    return (
                        <tr key={i}>
                            <td className="border px-3 py-2">{session.date}</td>
                            <td className="border px-3 py-2">{session.day}</td>
                            <td className="border px-3 py-2">{session.time}</td>
                            <td className="border px-3 py-2">{session.subject}</td>
                            <td className="border px-3 py-2">{session.degree}</td>
                            <td className="border px-3 py-2">{venue}</td>
                            <td className="border px-3 py-2">
                                {staff?.supervisors?.length
                                    ? staff.supervisors.map((s, j) => <div key={j}>{s}</div>)
                                    : '-'}
                            </td>
                            <td className="border px-3 py-2">
                                {staff?.invigilators?.length
                                    ? staff.invigilators.map((inv, k) => <div key={k}>{inv}</div>)
                                    : '-'}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default FinalReport;