import Header from "../components/Header";

const LogSession = () => {
  return (
    <main className="relative w-full min-h-screen bg-bg flex flex-col self-center px-[2%] py-3 transition-all duration-500 ease-in-out md:px-[5%] lg:px-[10%]">
      <Header />
      <div className="text-center text-2xl flex justify-center items-center text-textcolor h-[70vh]">
        Log sessions
      </div>
    </main>
  );
};

export default LogSession;
