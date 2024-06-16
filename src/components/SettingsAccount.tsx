import { ChangeEvent, useEffect, useState } from "react";
import { useGetAccountQuery } from "../features/auth/authApiSlice";
import { getCurrentUser, setAuth } from "../features/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import Loader from "../assets/loader.json";
import { useUpdateSettingAccountMutation } from "../features/Apislices/settingsApiSlice";
import { toast } from "sonner";
import defaultProfile from "../assets/profile.webp";

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
  const [updateAccount] = useUpdateSettingAccountMutation();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(accountDetails?.fullName);
  const [phoneNumber, setPhoneNumber] = useState(accountDetails?.phoneNumber);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(accountDetails?.photoURL);
  console.log({ accountDetails });
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
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
    setFullName(accountDetails?.fullName);
    setPhoneNumber(accountDetails?.phoneNumber);
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
        <div className="w-full">
          <label className="text-sm text-desccolor font-bold">Full Name</label>
          <input
            type="name"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="basic-input"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
