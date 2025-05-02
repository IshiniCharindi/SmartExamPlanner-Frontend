import ExamScheduleForm from "../Components/ExamShedule/ExamScheduleForm.tsx";
import ExamScheduleTable from "../Components/ExamShedule/ExamScheduleTable.tsx";

const AddingExamSession = () => {
    return (
        <div className=" addExamSchedules bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-2xl font-semibold text-gray-800">Exam Session Management</h1>
                            <p className="mt-1 text-sm text-gray-600">Add and manage exam sessions for your institution</p>
                        </div>
                        <ExamScheduleForm/>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <ExamScheduleTable/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddingExamSession;