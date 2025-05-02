import React from 'react';
import ExamScheduleForm from "../Components/ExamShedule/ExamScheduleForm.tsx";
import ExamScheduleTable from "../Components/ExamShedule/ExamScheduleTable.tsx";

const AddingExamSession = () => {
    return (
        <div>
            <ExamScheduleForm/>
            <ExamScheduleTable/>
        </div>
    );
};

export default AddingExamSession;