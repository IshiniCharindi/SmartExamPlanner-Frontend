import domain, {headers} from "./ServiceConfig.tsx";

const getAllExamHallRequest = async () => {
    return domain.get('examHall/getAllExamHalls', headers);
}

export {getAllExamHallRequest}