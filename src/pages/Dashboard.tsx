import { useSelector } from "react-redux";
import { getUserLoggedIn } from "../features/store/auth/authSlice";
import Header from "../components/Header";

const Dashboard = () => {
  const userLoggedIn = useSelector(getUserLoggedIn);
  console.log({ userLoggedIn });
  return (
    <>
      <main className="relative w-full min-h-screen bg-bg flex flex-col self-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
        <Header />
      </main>
    </>
  );
};

export default Dashboard;
