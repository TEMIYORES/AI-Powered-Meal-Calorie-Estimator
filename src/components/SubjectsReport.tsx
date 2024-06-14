import Lottie from "lottie-react";
import Loader from "../assets/loader.json";

const SubjectsReport = ({
  sessions,
  isLoading,
}: {
  sessions: any;
  isLoading: boolean;
}) => {
  return (
    <div className="flex-1 rounded-md bg-headerbg p-5">
      <div className="mb-4 inline-block">
        <h1 className="transition-all cursor-default border-b-2 border-textcolor pb-3 text-xl font-semibold text-textcolor ease-in-out duration-300 hover:border-bg">
          Subjects Report
        </h1>
      </div>
      {isLoading ? (
        <div className="flex-grow w-full flex items-center justify-center">
          <Lottie
            animationData={Loader}
            loop={true}
            style={{ width: "100px" }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
      )}
    </div>
  );
};

export default SubjectsReport;
