import {getAllFacultiesRequest} from "../Services/LectureRequests.tsx";

export interface Faculty {
    facultyId: number;
    name: string;
}

export class FacultyService {
    static async getAllFaculties(): Promise<Faculty[]> {
        try {
            const response = await getAllFacultiesRequest();
            if (response.status === 200 && response.data.proceed) {
                return response.data.content;
            }
            return [];
        } catch (error) {
            console.error("Error fetching faculties:", error);
            return [];
        }
    }
}