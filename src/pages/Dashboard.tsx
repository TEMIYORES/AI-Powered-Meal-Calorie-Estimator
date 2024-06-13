import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserLoggedIn } from "../features/store/auth/authSlice";

const Dashboard = () => {
  const userLoggedIn = useSelector(getUserLoggedIn);
  console.log({ userLoggedIn });
  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <h1 className="text-textcolor h-[90vh] text-2xl flex justify-center items-center">
        Welcome to Dashboard!
      </h1>
      ;
    </>
  );
};

export default Dashboard;
