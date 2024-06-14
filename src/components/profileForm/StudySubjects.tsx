import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  getProfileData,
  setProfileData,
} from "../../features/store/profile/profileSlice";
import { useState } from "react";
import AllSubjects, { option } from "../../assets/subjects";
import { customStyles } from "../../theme/Styles";

const StudySubjects = () => {
  const profileData = useSelector(getProfileData);
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState(profileData.subjects);

  const handleSubjectChange = (selected: any) => {
    setSubjects(selected);
    dispatch(setProfileData({ ...profileData, subjects: selected }));
  };
  const level = profileData.educationLevel;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <label htmlFor="educationLevel" className="input-label">
          Which subjects are you currently studying?
        </label>
        <Select
          options={AllSubjects[level] as option[]}
          isMulti
          styles={customStyles}
          value={subjects}
          onChange={handleSubjectChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default StudySubjects;
