import {getAllExamHallRequest} from "../Services/ExamHallRequests.tsx";
export interface ExamHall {
    hallId?: number;
    hallName: string;
    maxCapacity: string;

}

export class ExamHallService {
    static async getAllExamHalls(): Promise<ExamHall[]> {
        try {
            const response = await getAllExamHallRequest();

            if (response.status === 200 && response.data.proceed) {
                console.log("department",response.data.content)
                return response.data.content;
            }
            return [];
        } catch (error) {
            console.error("Error fetching departments:", error);
            return [];
        }
    }
}