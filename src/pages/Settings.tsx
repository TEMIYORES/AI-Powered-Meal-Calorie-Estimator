import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserLoggedIn,
} from "../features/store/auth/authSlice";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";

// If you are using date-fns v2.x, please import `AdapterDateFns`

const Settings = () => {
  const currentUser = useSelector(getCurrentUser);
  const userLoggedIn = useSelector(getUserLoggedIn);
  // const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      {!currentUser?.profileSetup && (
        <Navigate to={"/profile"} replace={true} />
      )}
      <main className="relative w-full min-h-screen bg-bg flex flex-col self-center place-items-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
        <Header />
        <ChatBot />

        {/* <StudyPlan studyPlan={studyPlan} /> */}
      </main>
    </>
  );
};

export default Settings;
