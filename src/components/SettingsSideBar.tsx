const SettingsSideBar = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
}) => {
  return (
    <div className="w-[15%] flex-grow flex-1 flex flex-col text-desccolor gap-y-3 font-semibold border-r border-desccolor p-3 text-sm">
      <div
        className={`cursor-pointer py-1 px-4 rounded-md transition-all ease-linear hover:bg-desccolor hover:text-textcolor ${
          currentTab == "account"
            ? "bg-textcolor text-desccolo pointer-events-none"
            : ""
        }`}
        onClick={() => setCurrentTab("account")}
      >
        Account
      </div>
      <div
        className={` cursor-pointer py-1 px-4 rounded-md transition-all ease-linear hover:bg-desccolor hover:text-textcolor ${
          currentTab == "profile"
            ? "bg-textcolor text-desccolor pointer-events-none"
            : ""
        }`}
        onClick={() => setCurrentTab("profile")}
      >
        Profile
      </div>
    </div>
  );
};

export default SettingsSideBar;
