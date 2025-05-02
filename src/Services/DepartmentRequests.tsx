// Department endpoints
import domain, {headers} from "./ServiceConfig.tsx";

const getAllDepartmentsRequest = async () => {
    return domain.get('department/getAllDepartments', headers);
}

export {getAllDepartmentsRequest}