import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/store/auth/authSlice";
import { useGetStudySessionsQuery } from "../features/Apislices/StudySessionApiSlice";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Lottie from "lottie-react";
import Loader from "../assets/loader.json";
const StudySessionReport = () => {
  const currentUser = useSelector(getCurrentUser);
  const [timeRange, setTimeRange] = useState("all");
  const {
    data: studySessions,
    refetch: newestSessions,
    isLoading,
  } = useGetStudySessionsQuery({
    email: currentUser?.email,
    timeRange,
  });
  console.log({ emailreport: currentUser?.email });

  useEffect(() => {
    newestSessions();
  }, [timeRange]);

  const series = [
    {
      name: "Study Duration (minutes)",
      data: studySessions?.map((session: any) => session.duration),
    },
  ];

  const options: any = {
    chart: {
      type: "area",
      height: "100%",
      width: "100%",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
      colors: ["#4f46e5"],
    },
    markers: {
      size: 3,
      colors: ["#4f46e5"],
      strokeColor: ["#fff"],
      strokeWidth: 1,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical", // can also be 'horizontal'
        gradientToColors: ["#4f46e5", "#171717"], // the ending color for the gradient
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#737373",
      strokeDashArray: 0,
    },

    yaxis: {
      labels: {
        style: {
          colors: "#737373",
          fontWeight: "600",
        },
      },
    },
    xaxis: {
      type: "",
      categories: studySessions?.map((session: any) => session.subject),
      labels: {
        style: {
          colors: "#737373",
          fontWeight: "600",
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="flex-1 rounded-md bg-headerbg p-5">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="transition-all cursor-default border-b-2 border-textcolor pb-3 text-xl font-semibold text-textcolor ease-in-out duration-300 hover:border-bg">
          Study Session Report
        </h1>

        <div className="flex gap-3 items-center">
          <h3
            onClick={() => setTimeRange("day")}
            className={`transition-all cursor-pointer border-b pb-1 text-sm font-semibold ease-in-out duration-300 hover:border-bg hover:text-desccolor ${
              timeRange === "day"
                ? "border-desccolor text-desccolor pointer-events-none"
                : "text-textcolor border-textcolor"
            } `}
          >
            Daily
          </h3>
          <h3
            onClick={() => setTimeRange("week")}
            className={`transition-all cursor-pointer border-b pb-1 text-sm font-semibold ease-in-out duration-300 hover:border-bg hover:text-desccolor ${
              timeRange === "week"
                ? "border-desccolor text-desccolor pointer-events-none"
                : "text-textcolor border-textcolor"
            } `}
          >
            Weekly
          </h3>
          <h3
            onClick={() => setTimeRange("month")}
            className={`transition-all cursor-pointer border-b pb-1 text-sm font-semibold ease-in-out duration-300 hover:border-bg hover:text-desccolor ${
              timeRange === "month"
                ? "border-desccolor text-desccolor pointer-events-none"
                : "text-textcolor border-textcolor"
            } `}
          >
            Monthly
          </h3>
          <h3
            onClick={() => setTimeRange("all")}
            className={`transition-all cursor-pointer border-b pb-1 text-sm font-semibold ease-in-out duration-300 hover:border-bg hover:text-desccolor ${
              timeRange === "all"
                ? "border-desccolor text-desccolor pointer-events-none"
                : "text-textcolor border-textcolor"
            } `}
          >
            All
          </h3>
        </div>
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
        <div className="w-full rounded-md bg-bg p-2 md:p-5">
          <Chart
            options={options}
            series={series}
            type="area"
            height="250px"
            width="100%"
          />
        </div>
      )}
    </div>
  );
};

export default StudySessionReport;
