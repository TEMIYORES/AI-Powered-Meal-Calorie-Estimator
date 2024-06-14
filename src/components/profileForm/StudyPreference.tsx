import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  getProfileData,
  setProfileData,
} from "../../features/store/profile/profileSlice";
import { customStyles } from "../../theme/Styles";
const StudyPreferences = () => {
  const profileData = useSelector(getProfileData);
  const dispatch = useDispatch();

  const [studyTimes, setStudyTimes] = useState(profileData.preferredStudyTimes);
  const [studySessionDuration, setStudySessionDuration] = useState(
    profileData.studySessionDuration
  );
  const [breakFrequency, setBreakFrequency] = useState(
    profileData.breakFrequency
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log({ value });
    dispatch(setProfileData({ ...profileData, [name]: value }));
  };
  const options = [
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
  ];
  const handleStudyTime = (selected: any) => {
    setStudyTimes(selected);
    dispatch(setProfileData({ ...profileData, preferredStudyTimes: selected }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <label className="input-label">When do you prefer to study?</label>
        <Select
          options={options}
          isMulti
          styles={customStyles}
          value={studyTimes}
          onChange={handleStudyTime}
          className="w-full"
        />
      </div>
      <div className="text-center">
        <label htmlFor="studySessionDuration" className="input-label">
          How long do you prefer each study session to be?
        </label>
        <select
          name="studySessionDuration"
          id="studySessionDuration"
          value={studySessionDuration}
          onChange={(e) => {
            {
              setStudySessionDuration(e.target.value);
              handleChange(e);
            }
          }}
          className="basic-input"
        >
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="1 hour 30 minutes">1 hour 30 minutes</option>
          <option value="2 hours">2 hours</option>
          <option value="2 hours">2 hours 30 minutes</option>
          <option value="2 hours">3 hours</option>
          <option value="2 hours">3 hours 30 minutes</option>
          <option value="2 hours">4 hours</option>
        </select>
      </div>
      <div className="text-center">
        <label htmlFor="breakFrequency" className="input-label">
          How often do you prefer to take breaks?
        </label>
        <select
          name="breakFrequency"
          id="breakFrequency"
          value={breakFrequency}
          onChange={(e) => {
            {
              setBreakFrequency(e.target.value);
              handleChange(e);
            }
          }}
          className="basic-input"
        >
          <option value="30 minutes">Every 30 minutes</option>
          <option value="1 hour">Every hour</option>
          <option value="1 hour 30 minutes">Every hour 30 minutes</option>
          <option value="2 hours">Every 2 hours</option>
        </select>
      </div>
    </div>
  );
};

export default StudyPreferences;
