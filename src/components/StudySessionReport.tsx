import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/store/auth/authSlice";
const StudySessionReport = () => {
  return (
    <div className="flex-1 rounded-md bg-headerbg p-5">
      Study Session report
    </div>
  );
};

export default StudySessionReport;
