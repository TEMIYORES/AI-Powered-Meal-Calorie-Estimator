import Lottie from "lottie-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "../assets/loader.json";
import defaultProfile from "../assets/profile.webp";
import { useGetAccountQuery } from "../features/auth/authApiSlice";
import { getCurrentUser } from "../features/store/auth/authSlice";

const SettingsAccount = () => {
  const currentUser = useSelector(getCurrentUser);
  const {
    data: accountDetails,
    isLoading,
    refetch,
  } = useGetAccountQuery({
    email: currentUser?.email,
  });
  useEffect(() => {
    refetch();
  }, [accountDetails]);
  const [imageUrl, setImageUrl] = useState(accountDetails?.photoURL);
  console.log({ accountDetails });
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImageUrl(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select an image file (jpeg, png, etc.)");
      }
    }
  };

  useEffect(() => {
    setImageUrl(accountDetails?.photoURL);
  }, [accountDetails]);

  return isLoading ? (
    <div className="flex-grow w-full flex items-center justify-center">
      <Lottie animationData={Loader} loop={true} style={{ width: "100px" }} />
    </div>
  ) : (
    <div className="flex-grow flex w-full flex-col gap-3 items-end justify-between">
      <div className="flex flex-col w-full h-[400px] gap-3 items-center overflow-y-auto">
        <div className="relative w-24 h-24 flex items-center justify-center text-textcolor cursor-pointer duration-300 transition-all rounded-full ease-in-out overflow-hidden">
          <label htmlFor="file-upload">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-full h-full object-cover"
                alt={"profile picture"}
              />
            ) : (
              <img
                src={defaultProfile}
                className="w-full h-full object-cover"
                alt={"profile picture"}
              />
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
