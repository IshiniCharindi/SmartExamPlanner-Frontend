import {
    getAllLecturersRequest,
    addLecturerRequest,
    updateLecturerRequest,
    updateLecturerAvailabilityRequest,
    deleteLecturerRequest,
} from "../Services/LectureRequests";

export interface Lecturer{
    lecturerId?: number;
    name: string;
    departmentId: number;
    rank: string;
    facultyId: number;
    availability: boolean;
    email: string;
    phone: string;
}

export class LecturerService {
    static async getAllLecturers(): Promise<Lecturer[]> {
        try {
            const response = await getAllLecturersRequest();
            console.log(response)
            if (response.status === 200 && response.data.proceed) {
                return response.data.content;
            }
            return [];
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            return [];
        }
    }

    static async addLecturer(lecturerData: Lecturer): Promise<Lecturer | null> {
        try {
            const response = await addLecturerRequest(lecturerData);
            if (response.status === 200 && response.data.proceed) {
                return response.data.proceed;
            }
            return null;
        } catch (error) {
            console.error("Error adding lecturer:", error);
            return null;
        }
    }

    static async updateLecturer(lecturerData: Lecturer): Promise<Lecturer | null> {
        try {
            const response = await updateLecturerRequest(lecturerData);
            if (response.status === 200 && response.data.proceed) {
                return response.data.content;
            }
            return null;
        } catch (error) {
            console.error("Error updating lecturer:", error);
            return null;
        }
    }

    static async updateLecturerAvailability(
        lecturerId: number,
        availability: Record<string, boolean>
    ): Promise<Lecturer | null> {
        try {
            const response = await updateLecturerAvailabilityRequest(lecturerId, availability);
            if (response.status === 200 && response.data.proceed) {
                return response.data.content;
            }
            return null;
        } catch (error) {
            console.error("Error updating availability:", error);
            return null;
        }
    }

    static async deleteLecturer(lecturerId: number): Promise<boolean> {
        try {
            const response = await deleteLecturerRequest(lecturerId);
            return response.status === 200 && response.data.proceed;
        } catch (error) {
            console.error("Error deleting lecturer:", error);
            return false;
        }
    }
}



