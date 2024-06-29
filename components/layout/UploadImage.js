import Image from "next/image";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Add Firebase storage
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAphBd4q0wtjCajhKeFG0VNVuUOJnFa6Zc",
  authDomain: "foodhunch-421016.firebaseapp.com",
  projectId: "foodhunch-421016",
  storageBucket: "foodhunch-421016.appspot.com",
  messagingSenderId: "178540139933",
  appId: "1:178540139933:web:170ed898a4aa110897cb74",
  measurementId: "G-C3GRZ38TYM",
};

firebase.initializeApp(firebaseConfig);

const UploadImage = ({
  menu,
  image,
  setImage,
  setDisabled,
  setIsChosingImage,
  disabled,
  isChosingImage,
}) => {
  const handleFileChange = async (e) => {
    setDisabled(true);
    setIsChosingImage(true);

    const selectedFile = e.target.files[0];
    try {
      if (selectedFile) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(selectedFile.name);

        const uploadPromise = fileRef.put(selectedFile).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadUrl) => {
            console.log(downloadUrl);
            setImage(downloadUrl);
            alert("image selected");
            setDisabled(false);
            setIsChosingImage(false);
          });
        });

        await toast.promise(uploadPromise, {
          loading: "uploading...",
          success: "upload complete",
          error: "an error occured, please try again",
        });

        setDisabled(false);
      } else {
        console.log("no file chosen");
      }
    } catch (error) {
      alert("an error occured, please try again");
      console.log(err);
      throw new Error(err);
    }
  };
  return (
    <div>
      <div
        className={`${
          isChosingImage ? "bg-gray-800 " : "bg-gray-300 "
        } w-[20rem] mx-auto lg:mx-0 flex mb-3 lg:flex flex-col items-center rounded-xl  lg:w-[12rem] h-[8rem]`}
      >
        {image ? (
          <>
            {!disabled && (
              <>
                <Image
                  className={
                    menu
                      ? " w-full max-h-[8rem] lg:h-[25rem] rounded-xl object-contain "
                      : "w-full  rounded-full object-contain min-h-[7.5rem] max-h-[7.5rem]"
                  }
                  src={image}
                  alt="img"
                  width={300}
                  height={300}
                  // layout="fill"
                  objectFit="contain"
                />{" "}
              </>
            )}
          </>
        ) : (
          <>
            <div className=" p-3 text-center mx-auto">No image</div>
          </>
        )}
      </div>

      <label
        className={
          "mt-5 lg:mt-0 mx-auto flex justify-center shadow-xl border py-1 px-9 w-[13rem]  rounded-lg"
        }
      >
        <input
          type="file"
          // disabled={isUploading}
          hidden
          onChange={handleFileChange}
        />
        <p className="">{disabled ? "uploading... " : "chose image"} </p>
      </label>
    </div>
  );
};

export default UploadImage;
