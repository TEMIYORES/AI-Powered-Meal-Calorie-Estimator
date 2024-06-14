import Lottie from "lottie-react";
import ProgressChart from "./ProgressChart";
import Loader from "../assets/loader.json";
import { convertMinutesToHoursAndMinutes } from "../utils/TimeConverter";

const ProgressReport = ({
  isLoading,
  totalMinutes,
  averageDailyMinutes,
  loggedSessions,
  missedSessions,
  handleDownloadImage,
}: {
  isLoading: boolean;
  totalMinutes: number;
  averageDailyMinutes: number;
  loggedSessions: number;
  missedSessions: number;
  handleDownloadImage: () => void;
}) => {
  return (
    <>
      <div className="flex-1 rounded-md bg-headerbg p-5">
        <div className="relative mb-4 inline-block w-full ">
          <h1 className="w-fit transition-all cursor-default border-b-2 border-textcolor pb-3 text-xl font-semibold text-textcolor ease-in-out duration-300 hover:border-bg">
            Progress Report
          </h1>
          <button
            onClick={handleDownloadImage}
            className="text-textcolor absolute top-0 right-0 p-2 border border-textcolor rounded-lg transition-all cursor-pointer hover:border-primary "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex bg-bg w-[100%] items-center justify-between rounded-lg p-8 text-textcolor">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold">Total Hours Studied</h1>
                <span className="text-sm font-semibold text-desccolor">
                  Total reading hours
                </span>
              </div>
              <h1 className="text-xl font-bold">
                {convertMinutesToHoursAndMinutes(totalMinutes)}
              </h1>
            </div>
            <div className="row-span-2 flex bg-bg w-[100%] p-2 rounded-lg items-center justify-center">
              <ProgressChart
                loggedSessions={loggedSessions}
                missedSessions={missedSessions}
              />
            </div>
            <div className="flex bg-bg w-[100%] items-center justify-between rounded-lg p-8 text-textcolor">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold">Average Daily Hours</h1>
                <span className="text-sm font-semibold text-desccolor">
                  Total reading hours
                </span>
              </div>
              <h1 className="text-xl font-bold ">
                {convertMinutesToHoursAndMinutes(averageDailyMinutes)}
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgressReport;
