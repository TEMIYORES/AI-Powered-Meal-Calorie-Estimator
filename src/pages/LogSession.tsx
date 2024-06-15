import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserLoggedIn,
} from "../features/store/auth/authSlice";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../assets/loader.json";
import ProfileCenter from "../components/profileForm/ProfileCenter";
import { useGetSubjectsQuery } from "../features/Apislices/ProfileApiSlice";
// If you are using date-fns v2.x, please import `AdapterDateFns`
import Lottie from "lottie-react";

const LogSession = () => {
  const currentUser = useSelector(getCurrentUser);
  const userLoggedIn = useSelector(getUserLoggedIn);
  // const [date, setDate] = useState<Date>(new Date());
  const { data: subjects, isLoading: gettingSubjects } = useGetSubjectsQuery({
    email: currentUser?.email,
  });


  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      {!currentUser?.profileSetup && (
        <Navigate to={"/profile"} replace={true} />
      )}
      <main className="relative w-full min-h-screen bg-bg flex flex-col self-center place-items-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
        <Header />

        {gettingSubjects ? (
          <main className="w-full h-screen flex self-center place-content-center place-items-center">
            <Lottie
              animationData={Loader}
              loop={true}
              style={{ width: "100px" }}
            />
          </main>
        ) : (
          <div className="flex-grow w-full place-content-center">
            <ProfileCenter>
              <div className="text-center">
                <div className="mb-5">
                  <h3 className="text-textcolor text-xl font-semibold sm:text-2xl">
                    Log Study Session
                  </h3>
                </div>
              </div>
            </ProfileCenter>
          </div>
        )}
        {/* <StudyPlan studyPlan={studyPlan} /> */}
      </main>
    </>
  );
};

export default LogSession;
