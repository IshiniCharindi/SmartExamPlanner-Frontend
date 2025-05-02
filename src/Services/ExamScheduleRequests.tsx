import domain, { headers } from "./serviceConfig";
import { ExamSession } from "../models/ExamSession.tsx";



const addExamSessionRequest = async (examDetails: ExamSession) => {
    return domain.post('examSession/addSession', examDetails, headers);
}


export {
    addExamSessionRequest,
}