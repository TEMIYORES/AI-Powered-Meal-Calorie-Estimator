import { convertMinutesToHoursAndMinutes } from "../utils/TimeConverter";

const Card = ({ subject, duration }: { subject: string; duration: number }) => {
  return (
    <div className="flex bg-bg w-[100%] items-center justify-between rounded-lg p-8 text-textcolor">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">{subject}</h1>
        <span className="text-sm font-semibold text-desccolor">
          Total reading hours
        </span>
      </div>
      <h1 className="text-xl font-bold ">
        {convertMinutesToHoursAndMinutes(duration)}
      </h1>
    </div>
  );
};

export default Card;
