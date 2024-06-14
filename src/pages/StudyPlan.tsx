import Table from "../components/Table";
import Lottie from "lottie-react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserLoggedIn,
} from "../features/store/auth/authSlice";
import { useGetStudyPlanQuery } from "../features/Apislices/ProfileApiSlice";
import Loader from "../assets/loader.json";
import Header from "../components/Header";
import { useEffect } from "react";
const StudyPlan = () => {
  const currentUser = useSelector(getCurrentUser);
  const userLoggedIn = useSelector(getUserLoggedIn);
  const {
    data: studyPlan,
    isLoading,
    refetch,
  } = useGetStudyPlanQuery({
    email: currentUser?.email,
  });
  useEffect(() => {
    refetch();
  }, [studyPlan]);
  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      {!currentUser?.profileSetup && (
        <Navigate to={"/profile"} replace={true} />
      )}
      <main className="relative w-full min-h-screen bg-bg flex flex-col self-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%] gap-3">
        <Header />

        {isLoading ? (
          <main className="w-full h-screen flex self-center place-content-center place-items-center">
            <Lottie
              animationData={Loader}
              loop={true}
              style={{ width: "100px" }}
            />
          </main>
        ) : (
          <>
            <Table studyPlan={studyPlan} />
          </>
        )}
      </main>
    </>
  );
};

export default StudyPlan;
