import Lottie from "lottie-react";
import CheckIcon from "../../assets/checkedIcon.json";
import { useNavigate } from "react-router-dom";
const Alert = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full  flex self-center place-content-center place-items-center">
      <div className="w-96 text-gray-600 space-y-2 p-4 shadow-xl border rounded-xl text-center flex flex-col place-items-center">
        <Lottie
          animationData={CheckIcon}
          loop={true}
          style={{ width: "150px", height: "150px" }}
        />
        <h2 className="font-bold text-lg">You are all set!</h2>
        <p className="text-sm text-gray-500">
          Profile setup complete! Welcome to your personalized study dashboard.
        </p>
        <button className="basic-button w-full" onClick={() => navigate("/dashboard")}>
          Go to dashboard
        </button>
      </div>
    </main>
  );
};

export default Alert;
