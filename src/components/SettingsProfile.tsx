import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
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
  const [age, setAge] = useState(profile?.age);
  const [educationLevel, setEducationLevel] = useState<
    "HighSchool" | "Undergraduate" | "Graduate"
  >(profile?.educationLevel);
  
  useEffect(() => {
    refetch();
  }, [profile]);
  useEffect(() => {
    setAge(profile?.age);
    setEducationLevel(profile?.educationLevel);
  }, [profile]);
  return gettingProfile ? (
    <div className="flex-grow w-full flex items-center justify-center">
      <Lottie animationData={Loader} loop={true} style={{ width: "100px" }} />
    </div>
  ) : (
    <div className="flex-grow w-full flex flex-col gap-3 items-end justify-between">
      <div className="flex-grow w-full h-[400px] flex flex-col gap-3 items-center overflow-y-auto">
        <div className="w-full">
          <label htmlFor="id" className="input-label">
            How old are you?
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            className="basic-input"
          />
        </div>
        <div className="w-full">
          <label htmlFor="educationLevel" className="input-label">
            What is your current education level?
          </label>
          <select
            name="educationLevel"
            id="educationLevel"
            value={educationLevel}
            onChange={(e) => {
              if (
                e.target.value === "HighSchool" ||
                e.target.value === "Undergraduate" ||
                e.target.value === "Graduate"
              ) {
                setEducationLevel(e.target.value);
              }
            }}
            className="basic-input"
          >
            <option value="HighSchool">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
