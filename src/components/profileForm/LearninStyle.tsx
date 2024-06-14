import { useDispatch, useSelector } from "react-redux";
import { getProfileData, setProfileData } from "../../features/store/profile/profileSlice";
import { ChangeEvent, useState } from "react";

const LearninStyle = () => {
  const profileData = useSelector(getProfileData);
  const dispatch = useDispatch();

  const [learningStyle, setLearningStyle] = useState(profileData.learningStyle);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log({ value });
    dispatch(setProfileData({ ...profileData, [name]: value }));
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <label htmlFor="learningStyle" className="input-label">
          What is your preferred learning style?
        </label>
        <select
          name="learningStyle"
          id="learningStyle"
          value={learningStyle}
          onChange={(e) => {
            {
              setLearningStyle(e.target.value);
              handleChange(e);
            }
          }}
          className="basic-input"
        >
          <option value="Visual">Visual</option>
          <option value="Auditory">Auditory</option>
          <option value="Reading/Writing">Reading/Writing</option>
          <option value="Kinesthetic">Kinesthetic</option>
        </select>
      </div>
    </div>
  );
};

export default LearninStyle;
