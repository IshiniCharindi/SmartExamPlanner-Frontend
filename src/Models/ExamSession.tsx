import {AppDispatch} from "../Redux/store.tsx";
import {loginAttemptRequest} from "../Services/userRequests.tsx";
import {setAdmin} from "../Redux/admin-slice.tsx";
import {User} from "./Users.tsx";
import {addExamSessionRequest} from "../Services/ExamScheduleRequests.tsx";

export interface ExamSession {
        sessionId?: number;
        examDate: string;         // Format: 'YYYY-MM-DD'
        startTime: string;        // Format: 'HH:MM:SS'
        endTime: string;          // Format: 'HH:MM:SS'
        subjectCode?: string;
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
}
