import { ChangeEvent, useState } from "react";
import {
  getProfileData,
  setProfileData,
} from "../../features/store/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const BasicInformation = () => {
  const profileData = useSelector(getProfileData);
  const dispatch = useDispatch();
  const [age, setAge] = useState(profileData.age);
  const [educationLevel, setEducationLevel] = useState(
    profileData.educationLevel
  );
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    console.log({ value });
    dispatch(setProfileData({ ...profileData, [name]: value }));
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
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
            handleChange(e);
          }}
          className="basic-input"
        />
      </div>
      <div className="text-center">
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
              handleChange(e);
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
  );
};

export default BasicInformation;
