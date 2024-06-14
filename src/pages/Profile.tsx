import { useSelector } from "react-redux";
import ProfileForm from "../components/profileForm/ProfileForm";
import { getUserLoggedIn } from "../features/store/auth/authSlice";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

const Profile = () => {
  const userLoggedIn = useSelector(getUserLoggedIn);
  return (
    <main className="w-full min-h-screen bg-bg flex flex-col self-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <Header disable={true} />
      <ProfileForm />
    </main>
  );
};

export default Profile;
