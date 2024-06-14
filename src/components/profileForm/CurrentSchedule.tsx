import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "../../theme/Timerangepicker.css";
import Select from "react-select";
import {
  getProfileData,
  setProfileData,
} from "../../features/store/profile/profileSlice";
import { customStyles } from "../../theme/Styles";

const CurrentSchedule = () => {
  const profileData = useSelector(getProfileData);
  const dispatch = useDispatch();

  const [availableStudyDays, setAvailableStudyDays] = useState(
    profileData.availableStudyDays
  );
  const [timeAvailability, setTimeAvailability] = useState(
    profileData.timeAvailability
  );

  const handleChange = (value: any, valueName: string) => {
    if (!value) {
      const { [valueName]: removed, ...newObjects } = timeAvailability;
      setTimeAvailability(newObjects);
      dispatch(
        setProfileData({
          ...profileData,
          timeAvailability: { ...newObjects },
        })
      );
    } else {
      setTimeAvailability((prev: any) => ({ ...prev, [valueName]: value }));
    }
  };
  useEffect(() => {
    dispatch(
      setProfileData({
        ...profileData,
        timeAvailability: { ...timeAvailability },
      })
    );
  }, [timeAvailability]);

  const handleTimeRemoval = (days: string[]) => {
    const timeDays = Object.keys(timeAvailability);
    console.log(timeDays);
    timeDays.forEach((timeDay) => {
      if (!days.includes(timeDay)) {
        const { [timeDay]: removed, ...newObjects } = timeAvailability;
        console.log({ newObjects });
        setTimeAvailability(newObjects);
      }
    });
  };
  const options = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  const handleAvailableStudyDays = (selected: any) => {
    setAvailableStudyDays(selected);
    dispatch(setProfileData({ ...profileData, availableStudyDays: selected }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <label className="input-label">
          Which days of the week are you available to study?
        </label>
        <Select
          options={options}
          isMulti
          styles={customStyles}
          value={availableStudyDays}
          onChange={(values) => {
            const days = values.map((day: any) => day.value);
            handleAvailableStudyDays(values);
            handleTimeRemoval(days);
          }}
          className="w-full"
        />
      </div>
      <div className="text-center">
        <label htmlFor="timeAvailability" className="input-label">
          What times are you available to study on each selected day?
        </label>
        <div className="mt-2">
          {availableStudyDays.map((day: { label: string }) => {
            return (
              <div className="flex items-center justify-between gap-3 mb-5 text-desccolor">
                <span className="w-1/3 text-start">{day.label}</span>
                <TimeRangePicker
                  name="timeAvailability"
                  onChange={(value) => handleChange(value, day.label)}
                  value={timeAvailability[day.label]}
                  required
                  amPmAriaLabel="PM"
                  disableClock={true}
                  className={"w-2/3 text-center text-textcolor"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentSchedule;
