// src/Services/lecturerRequests.tsx
import domain, { headers } from "./serviceConfig";
import {Lecturer} from "../Models/Lecturer.tsx";

// Lecturer endpoints
const getAllLecturersRequest = async () => {
    return domain.get('lecturer/all', headers);
}

const addLecturerRequest = async (lecturerData:Lecturer) => {
    console.log(lecturerData)
    return domain.post('lecturer/add', lecturerData, headers);
}

const updateLecturerRequest = async (lecturerData: Lecturer) => {
    return domain.put('lecturer/update', lecturerData, headers);
}

const updateLecturerAvailabilityRequest = async (lecturerId: number, availability: Record<string, boolean>) => {
    return domain.patch('lecturer/availability', { lecturerId, availability }, headers);
}

const deleteLecturerRequest = async (lecturerId: number) => {
    return domain.delete(`lecturer/delete/${lecturerId}`, headers);
}



// Faculty endpoints
const getAllFacultiesRequest = async () => {
    return domain.get('faculty/all', headers);
}

export {
    getAllLecturersRequest,
    addLecturerRequest,
    updateLecturerRequest,
    updateLecturerAvailabilityRequest,
    deleteLecturerRequest,
    getAllFacultiesRequest
}