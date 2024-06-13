import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { getUserLoggedIn } from "../store/auth/authSlice";
import { useSelector } from "react-redux";
import {
  doCreateUserWithEmailAndPassword,
  doSendEmailVerification,
} from "../firebase/auth";
import { useRegisterAccountMutation } from "./authApiSlice";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector(getUserLoggedIn);
  const [registerAccount] = useRegisterAccountMutation();
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(e.target.value);
    if (password !== e.target.value) {
      if (confirmPasswordRef.current)
        confirmPasswordRef.current.style.borderColor = "#dc2626";
    } else {
      if (confirmPasswordRef.current)
        confirmPasswordRef.current.style.borderColor = "#4f46e5";
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const response = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        console.log({ response });
        const emailVerification = await doSendEmailVerification();
        console.log({ emailVerification });
        toast("Email verification sent!");
        await registerAccount({
          fullName: fullName,
          email: response.user.email,
          photoURL: response.user.photoURL,
          emailVerified: response.user.emailVerified,
          phoneNumber: response.user.phoneNumber,
          password: password,
        });
        navigate("/login");
      } catch (err: any) {
        console.log({ err });
        if (err.code === "auth/email-already-in-use") {
          setErrorMessage("email already in use");
        }
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-desccolor space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-textcolor text-xl font-semibold sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-desccolor font-bold">
                Full Name
              </label>
              <input
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className="basic-input"
              />
            </div>
            <div>
              <label className="text-sm text-desccolor font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="basic-input"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm text-desccolor font-bold"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="basic-input"
              />
            </div>

            <div>
              <label className="text-sm text-desccolor font-bold">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                ref={confirmPasswordRef}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={handlePasswordCheck}
                className="basic-input"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-sm hover:underline font-bold"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
