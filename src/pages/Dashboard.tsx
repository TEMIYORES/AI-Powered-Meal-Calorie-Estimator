import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserLoggedIn,
  setAuth,
} from "../features/store/auth/authSlice";
import { Navigate } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "../assets/loader.json";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import StudySessionReport from "../components/StudySessionReport";
import { useGenerateStudyPlanMutation } from "../features/Apislices/ProfileApiSlice";
import { useEffect, useRef } from "react";
import { useLoginAccountMutation } from "../features/auth/authApiSlice";
import SubjectsReport from "../components/SubjectsReport";
import ProgressReport from "../components/ProgressReport";
import { useGetStudyMinsQuery } from "../features/Apislices/StudySessionApiSlice";
import html2canvas from "html2canvas";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log({ currentUser });
  const userLoggedIn = useSelector(getUserLoggedIn);
  const [loginAccount, { isLoading: gettingLogins }] =
    useLoginAccountMutation();
  const [generateStudyPlan, { isLoading }] = useGenerateStudyPlanMutation();
  const {
    data: sessions,
    refetch: newestSessions,
    isLoading: gettingStudyMins,
  } = useGetStudyMinsQuery({
    email: currentUser?.email,
  });
  useEffect(() => {
    newestSessions();
  }, []);
  useEffect(() => {
    const studyPlan = async () => {
      if (currentUser?.studyPlanSetup === false) {
        const response = await generateStudyPlan({
          email: currentUser?.email,
        });
        const userData = await loginAccount({
          email: currentUser?.email,
        }).unwrap();
        dispatch(setAuth(userData));
        console.log(response);
      }
    };
    studyPlan();
  }, [currentUser?.studyPlanSetup]);

  const handleDownloadImage = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "study_report.png";
        link.click();
      });
    }
  };
  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      {!currentUser?.profileSetup && (
        <Navigate to={"/profile"} replace={true} />
      )}
      <main className="relative w-full min-h-screen bg-bg flex flex-col self-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
        <Header />
        {isLoading || gettingLogins || gettingStudyMins ? (
          <main className="w-full h-screen flex self-center place-content-center place-items-center">
            <Lottie
              animationData={Loader}
              loop={true}
              style={{ width: "100px" }}
            />
          </main>
        ) : (
          <>
            <ChatBot />
            <div className="flex flex-col gap-3 mt-3 md:flex-row">
              <div ref={containerRef} className="flex flex-1 flex-col gap-3">
                <ProgressReport
                  isLoading={gettingStudyMins}
                  totalMinutes={sessions?.totalMinutes}
                  averageDailyMinutes={sessions?.averageDailyMinutes}
                  loggedSessions={sessions?.loggedSessions}
                  missedSessions={sessions?.missedSessions}
                  handleDownloadImage={handleDownloadImage}
                />
                <SubjectsReport
                  isLoading={gettingStudyMins}
                  sessions={sessions?.sessions}
                />
                <StudySessionReport />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
