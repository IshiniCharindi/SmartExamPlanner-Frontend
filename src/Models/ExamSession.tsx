import {addExamSessionRequest,getAllExamSessions,updateSession,deleteSession} from "../Services/ExamScheduleRequests.tsx";

export interface ExamSession {
        sessionId?: number;
        examDate: string;
        startTime: string;
        endTime: string;
        subjectCode?: string;
        departmentId: number; // Changed from string to number to match database schema
        studentCount: number;
}
export class ExamSessionService {
        static async addExamSession(examSession: ExamSession): Promise<boolean> {
                const response = await addExamSessionRequest(examSession)
                console.log("Response",response)
                if(response.status === 200 && response.data.proceed) {
                        return true;
                }

                return false;
        }

        static async getAllExamSessions(): Promise<ExamSession[] | null> {
                try {
                        const response = await getAllExamSessions();
                        console.log("Sessions Response", response);

                        // Check if the response is successful
                        if (response.status === 200 && response.data.proceed) {
                                // Assuming response.data.sessions holds the array of exam sessions
                                return response.data.content || [];  // Return an empty array if no sessions
                        }
                        return null; // If the response is not as expected, return null
                } catch (error) {
                        console.error('Error fetching exam sessions:', error);
                        return null; // Return null in case of error
                }
        }

        static async updateSession(updatedSession: ExamSession): Promise<boolean> {
                try {
                        const response = await updateSession(updatedSession);
                        console.log("update response",response)
                        if (response.status === 200 && response.data.proceed) {
                                return true; // Return true if the update is successful
                        } else {
                                throw new Error('Failed to update session');
                        }
                } catch (error) {
                        console.error('Error updating session:', error);
                        return false; // Return false if there's an error
                }
        }
        static async deleteSession(sessionId: String): Promise<boolean> {
                try {
                        const response = await deleteSession(sessionId);
                        console.log("update response",response)
                        if (response.status === 200 && response.data.proceed) {
                                return true; // Return true if the update is successful
                        } else {
                                throw new Error('Failed to update session');
                        }
                } catch (error) {
                        console.error('Error updating session:', error);
                        return false; // Return false if there's an error
                }
        }
}
