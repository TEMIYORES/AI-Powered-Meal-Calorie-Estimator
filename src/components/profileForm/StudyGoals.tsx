import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileData,
  setProfileData,
} from "../../features/store/profile/profileSlice";

const StudyGoals = () => {
  const profileData = useSelector(getProfileData);
  const dispatch = useDispatch();
  const [shortTermGoals, setShortTermGoals] = useState(
    profileData.shortTermGoals
  );
  const [longTermGoals, setLongTermGoals] = useState(profileData.longTermGoals);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log({ value });
    dispatch(setProfileData({ ...profileData, [name]: value }));
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <label htmlFor="educationLevel" className="input-label">
          What are your short-term study goals?
        </label>
        <textarea
          rows={5}
          value={shortTermGoals}
          name="shortTermGoals"
          onChange={(e) => {
            setShortTermGoals(e.target.value);
            handleChange(e);
          }}
          className="basic-input"
          placeholder={`Ace my math test this week.\nComplete all homework assignments.\n`}
        />
      </div>
      <div className="text-center">
        <label htmlFor="educationLevel" className="input-label">
          What are your long-term study goals?
        </label>
        <textarea
          rows={5}
          value={longTermGoals}
          name="longTermGoals"
          onChange={(e) => {
            setLongTermGoals(e.target.value);
            handleChange(e);
          }}
          className="basic-input"
          placeholder={`Get into a top-tier university.\nEarn a merit-based scholarship for college.\n`}
        />
      </div>
    </div>
  );
};

export default StudyGoals;
