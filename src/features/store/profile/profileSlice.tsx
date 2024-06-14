import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { option } from "../../../assets/subjects";
interface initialStateProps {
  userData: {
    age: string;
    educationLevel: "HighSchool" | "Undergraduate" | "Graduate";
    subjects: option[];
    shortTermGoals: string;
    longTermGoals: string;
    preferredStudyTimes: option[];
    studySessionDuration: string;
    breakFrequency: string;
    learningStyle: string;
    availableStudyDays: option[];
    timeAvailability: any;
  };
  profileFilled: boolean;
}

const initialState: initialStateProps = {
  userData: {
    age: "",
    educationLevel: "HighSchool",
    subjects: [],
    shortTermGoals: "",
    longTermGoals: "",
    preferredStudyTimes: [],
    studySessionDuration: "30 minutes",
    breakFrequency: "30 minutes",
    learningStyle: "Visual",
    availableStudyDays: [],
    timeAvailability: {},
  },
  profileFilled: false,
};

const profileSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      console.log("action.payload", action.payload);
      const newdata = action.payload;
      if (newdata) {
        state.userData = { ...state.userData, ...newdata };
        console.log(state.userData);
        state.profileFilled = true;
      }
    },
    removeProfileData: () => {
      return initialState;
    },
    setIsProfileFilled: (state) => {
      state.profileFilled = false;
    },
  },
});

export const { setProfileData, removeProfileData, setIsProfileFilled } =
  profileSlice.actions;
export default profileSlice.reducer;
export const getProfileData = (state: RootState) => state.profileData.userData;
export const getIsProfileFilled = (state: RootState) =>
  state.profileData.profileFilled;
