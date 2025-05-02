import {addExamSessionRequest,getAllExamSessions} from "../Services/ExamScheduleRequests.tsx";

export interface ExamSession {
        sessionId?: number;
        examDate: string;
        startTime: string;
        endTime: string;
        subjectCode?: string;
        studentCount: number;
    }
export class ExamSessionService {
        static async addExamSession(examSession: ExamSession): Promise<boolean> {
                const response = await addExamSessionRequest(examSession)
                // console.log("Response",response)
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
}
