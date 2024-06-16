import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./features/firebase/firebase";
import { useDispatch } from "react-redux";
import { setAuth } from "./features/store/auth/authSlice";
import { useLoginAccountMutation } from "./features/auth/authApiSlice";
import { useEffect } from "react";
import Loader from "./assets/loader.json";
import Lottie from "lottie-react";
function App() {
  const dispatch = useDispatch();
  const [loginAccount, { isLoading }] = useLoginAccountMutation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see user details
        console.log({ user });
        const userData = await loginAccount({ email: user.email }).unwrap();
        dispatch(setAuth(userData));
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });
  }, [auth]);

  return isLoading ? (
    <main className="w-full h-screen flex self-center place-content-center place-items-center">
      <Lottie animationData={Loader} loop={true} style={{ width: "100px" }} />
    </main>
  ) : (
    <>
      <div className="desktop-only">
        <Outlet />
      </div>
      <div className="mobile-only h-[98vh] flex-col items-center justify-center px-10 text-center">
        {/* Message for mobile users */}
        <h1 className="text-xl text-textcolor font-semibold">
          Not Available on Mobile
        </h1>
        <p className="text-sm text-desccolor">
          Sorry, this application is not accessible on mobile devices. Please
          visit us on a desktop.
        </p>
      </div>
    </>
  );
}

export default App;
