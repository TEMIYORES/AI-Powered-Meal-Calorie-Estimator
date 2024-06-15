import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getUserLoggedIn,
  removeAuth,
} from "../features/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { doSignOut } from "../features/firebase/auth";
import {
  useDeleteNotificationsMutation,
  useGetNotificationsQuery,
} from "../features/Apislices/NotificationApiSlice";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import defaultProfile from "../assets/profile.webp";

const Header = ({ disable }: { disable?: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notificationRef = useRef<HTMLDivElement>(null);
  const currentUser = useSelector(getCurrentUser);
  const userLoggedIn = useSelector(getUserLoggedIn);
  const { data: notifications, refetch: latestNotifications } =
    useGetNotificationsQuery({
      email: currentUser?.email,
    });
  const [deleteNotifications] = useDeleteNotificationsMutation();
  const handleLogout = () => {
    doSignOut();
    dispatch(removeAuth());
    navigate("/login");
  };
  const handleShowNotification = () => {
    notificationRef?.current?.classList.toggle("hidden");
  };
  useEffect(() => {
    latestNotifications();
  }, []);
  const handleNotificationClear = async () => {
    const response = await deleteNotifications({
      email: currentUser?.email,
    }).unwrap();
    latestNotifications();
    toast(response?.message);
  };
  return (
    <header className="sticky z-20 top-0 left-0 w-full flex flex-row gap-x-2 h-full justify-between items-center shadow-md rounded-xl px-5 py-3 bg-headerbg">
      <div className="flex items-center gap-4">
        <img
          src={currentUser?.photoURL || defaultProfile}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-sm text-desccolor">Welcome back 👏🏽</p>
          <h3 className="text-lg text-textcolor">{currentUser?.fullName}</h3>
        </div>
      </div>
      <nav
        className={`hidden items-center gap-4 rounded-full bg-bg text-textcolor md:flex`}
      >
        <Link
          to="/dashboard"
          className={`transition-all rounded-full px-5 py-3 text-sm font-semibold duration-300
          ${
            window.location.href.includes("dashboard")
              ? "bg-navbg pointer-events-none"
              : ""
          }  ${
            disable && `cursor-not-allowed pointer-events-none`
          } hover:bg-navbg`}
        >
          Dashboard
        </Link>
        <Link
          to="/studyplan"
          className={`transition-all rounded-full px-5 py-3 text-sm font-semibold duration-300 ${
            window.location.href.includes("studyplan")
              ? "bg-navbg pointer-events-none"
              : ""
          } ${
            disable && `cursor-not-allowed pointer-events-none`
          } hover:bg-navbg`}
        >
          Study Plan
        </Link>
        <Link
          to="/logsession"
          className={`transition-all rounded-full px-5 py-3 text-sm font-semibold duration-300 ${
            window.location.href.includes("logsession")
              ? "bg-navbg pointer-events-none"
              : ""
          }  ${
            disable && `cursor-not-allowed pointer-events-none`
          } hover:bg-navbg`}
        >
          Log Session
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <div
          className="relative text-textcolor cursor-pointer duration-300 transition-all p-2 rounded-full ease-in-out hover:bg-bg "
          onClick={handleShowNotification}
        >
          {notifications?.length ? (
            <div className="absolute h-4 w-4 overflow-auto top-0 right-1 bg-red-500 rounded-full flex place-items-center justify-center text-xs text-textcolor">
              {notifications?.length}
            </div>
          ) : null}

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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          <div
            ref={notificationRef}
            className={`hidden absolute z-10 p-2 min-w-64 bg-bg text-textcolor rounded-md top-12 transition-all ease-linear origin-bottom ${
              disable ? `cursor-not-allowed pointer-events-none` : ""
            }`}
          >
            {notifications?.length ? (
              <>
                <div className="text-center text-sm pb-2">
                  {notifications.length} unread notifications
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-1 text-sm p-2 bg-headerbg rounded-md mb-1 hover:bg-desccolor"
                    >
                      <span className="w-[95%]">{notification}</span>
                      <div className="h-2 w-2 self-center bg-primary rounded-full"></div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full text-sm p-2 bg-transparent border border-primary mt-2 text-center rounded-md transition-all ease-linear hover:bg-primary"
                  onClick={handleNotificationClear}
                >
                  mark all as read
                </button>
              </>
            ) : (
              <div className="text-center">No notifications</div>
            )}
          </div>
        </div>
        <Link
          to={"/settings"}
          className={`text-textcolor cursor-pointer duration-300 transition-all p-2 rounded-full ease-in-out hover:bg-bg  ${
            window.location.href.includes("settings")
              ? "bg-navbg pointer-events-none"
              : ""
          } ${disable ? `cursor-not-allowed pointer-events-none` : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        {userLoggedIn && (
          <button onClick={handleLogout} className="basic-button w-fit">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
