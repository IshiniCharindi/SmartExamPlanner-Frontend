import domain, {headers} from "./ServiceConfig.tsx";

const getAllFacultiesRequest = async () => {
    return domain.get('faculty/getAllFaculties', headers);
}

export {getAllFacultiesRequest}