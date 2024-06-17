import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import AllSubjects, { option } from "../assets/subjects";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loader from "../assets/loader.json";
import { useGetProfileQuery } from "../features/Apislices/ProfileApiSlice";
import { getCurrentUser } from "../features/store/auth/authSlice";
import "../theme/Timerangepicker.css";
import { customStyles } from "../theme/Styles";

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
  const [subjects, setSubjects] = useState<readonly option[]>(
    profile?.subjects
  );
  const [preferredStudyTimes, setPreferredStudyTimes] = useState<
  readonly option[]
>(profile?.preferredStudyTimes);
  const [shortTermGoals, setShortTermGoals] = useState(profile?.shortTermGoals);
  const [longTermGoals, setLongTermGoals] = useState(profile?.longTermGoals);

  const studyTimesoptions = [
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
  ];
  useEffect(() => {
    refetch();
  }, [profile]);
  useEffect(() => {
    setAge(profile?.age);
    setSubjects(profile?.subjects);
    setShortTermGoals(profile?.shortTermGoals);
    setPreferredStudyTimes(profile?.preferredStudyTimes);
    setLongTermGoals(profile?.longTermGoals);
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
        <div className="w-full">
          <label htmlFor="educationLevel" className="input-label">
            Which subjects are you currently studying?
          </label>
          <Select
            options={AllSubjects[educationLevel] as option[]}
            isMulti
            styles={customStyles}
            value={subjects}
            onChange={(values) => setSubjects(values)}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="educationLevel" className="input-label">
            What are your short-term study goals?
          </label>
          <textarea
            rows={5}
            value={shortTermGoals}
            name="shortTermGoals"
            onChange={(e) => {
              setShortTermGoals(e.target.value);
            }}
            className="basic-input"
            placeholder={`Ace my math test this week.\nComplete all homework assignments.\n`}
          />
        </div>
        <div className="w-full">
          <label htmlFor="educationLevel" className="input-label">
            What are your long-term study goals?
          </label>
          <textarea
            rows={5}
            value={longTermGoals}
            name="longTermGoals"
            onChange={(e) => {
              setLongTermGoals(e.target.value);
            }}
            className="basic-input"
            placeholder={`Get into a top-tier university.\nEarn a merit-based scholarship for college.\n`}
          />
        </div>
        <div className="w-full">
          <label className="input-label">When do you prefer to study?</label>
          <Select
            options={studyTimesoptions}
            isMulti
            styles={customStyles}
            value={preferredStudyTimes}
            onChange={(values) => setPreferredStudyTimes(values)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
