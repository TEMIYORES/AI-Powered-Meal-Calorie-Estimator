import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../assets/loader.json";
import { useGetProfileQuery } from "../features/Apislices/ProfileApiSlice";
import { getCurrentUser } from "../features/store/auth/authSlice";
import "../theme/Timerangepicker.css";

const SettingsProfile = () => {
  const currentUser = useSelector(getCurrentUser);
  const {
    data: profile,
    isLoading: gettingProfile,
    refetch,
  } = useGetProfileQuery({
    email: currentUser?.email,
  });
  useEffect(() => {
    refetch();
  }, [profile]);

  return gettingProfile ? (
    <div className="flex-grow w-full flex items-center justify-center">
      <Lottie animationData={Loader} loop={true} style={{ width: "100px" }} />
    </div>
  ) : (
    <div className="flex-grow w-full flex flex-col gap-3 items-end justify-between">
      profile settings
    </div>
  );
};

export default SettingsProfile;
