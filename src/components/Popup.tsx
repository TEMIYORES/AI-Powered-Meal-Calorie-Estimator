import Lottie from "lottie-react";
import CheckIcon from "../assets/checkedIcon.json";
import { useNavigate } from "react-router-dom";
const Popup = () => {
  const navigate = useNavigate();

  return (
    <main className="z-20 w-full h-full absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex self-center place-content-center place-items-center">
      <div className="w-96 text-textcolor space-y-2 p-4 shadow-xl border rounded-xl text-center flex flex-col place-items-center">
        <Lottie
          animationData={CheckIcon}
          loop={true}
          style={{ width: "150px", height: "150px" }}
        />
        <h2 className="font-bold text-lg">You are all set!</h2>
        <p className="text-sm text-textcolor">
          Profile setup complete! Your study plan will be regenerated!
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="basic-button w-full"
        >
          Go to dashboard
        </button>
      </div>
    </main>
  );
};

export default Popup;
