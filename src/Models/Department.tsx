import {getAllDepartmentsRequest} from "../Services/DepartmentRequests.tsx";

export interface Department {
    departmentId: number;
    name: string;
    facultyId: number;
}

export class DepartmentService {
    static async getAllDepartments(): Promise<Department[]> {
        try {
            const response = await getAllDepartmentsRequest();

            if (response.status === 200 && response.data.proceed) {
                // console.log(response.data.content)
                return response.data.content;
            }
            return [];
        } catch (error) {
            console.error("Error fetching departments:", error);
            return [];
        }
    }
}