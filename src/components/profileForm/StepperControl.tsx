import { useDispatch, useSelector } from "react-redux";
import {
  getIsProfileFilled,
  getProfileData,
  setIsProfileFilled,
} from "../../features/store/profile/profileSlice";
import { useSaveProfileMutation } from "../../features/Apislices/ProfileApiSlice";
import { getCurrentUser, setAuth } from "../../features/store/auth/authSlice";

const StepperControl = ({
  handleClick,
  steps,
  currentStep,
}: {
  handleClick: (direction: string) => void;
  steps: string[];
  currentStep: number;
}) => {
  const isProfileFilled = useSelector(getIsProfileFilled);
  const dispatch = useDispatch();
  const [saveProfile] = useSaveProfileMutation();
  const profileData = useSelector(getProfileData);
  const currentUser = useSelector(getCurrentUser);

  const handleBtnClick = async () => {
    handleClick("next");
    dispatch(setIsProfileFilled());
    if (currentStep === steps.length - 1) {
      try {
        await saveProfile({
          ...profileData,
          email: currentUser?.email,
          name: currentUser?.fullName,
        });
        dispatch(setAuth({ profileSetup: true }));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="w-[300px] self-center flex justify-center items-center gap-4 mt-4 mb-8">
      {/* back button */}

      {currentStep < steps.length && (
        <>
          <button
            onClick={() => handleClick("prev")}
            className={`h-7 w-8 flex justify-center items-center text-white font-medium rounded-full bg-primary ${
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>

          {/* next button */}
          {/* back button */}
          <button
            type="submit"
            disabled={!isProfileFilled}
            onClick={handleBtnClick}
            className="basic-button w-full"
          >
            {currentStep === steps.length - 1 ? "Save profile" : "Next"}
          </button>
        </>
      )}
    </div>
  );
};

export default StepperControl;
