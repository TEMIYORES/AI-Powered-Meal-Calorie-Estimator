import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserLoggedIn,
} from "../features/store/auth/authSlice";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const userLoggedIn = useSelector(getUserLoggedIn);
  const currentUser = useSelector(getCurrentUser);
  console.log({ userLoggedIn });
  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      {!currentUser?.profileSetup && (
        <Navigate to={"/profile"} replace={true} />
      )}
      <main className="relative w-full min-h-screen bg-bg flex flex-col self-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
        <Header />
        <div className="text-center text-2xl flex justify-center items-center text-textcolor h-[70vh]">
          Dashboard
        </div>
      </main>
    </>
  );
};

export default Dashboard;
