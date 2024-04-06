/* eslint-disable no-unused-vars */
import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'


function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUplodingProgress, setImageFileUplodingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    // console.log(imageFileUplodingProgress, imageFileUploadError);

    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }

    };
    // console.log(imageFile,imageFileUrl);
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {

        setImageFileUploadError(null);

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUplodingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError("Couldn't upload Image (File must be less than 2mb)");
                setImageFileUplodingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">

                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />

                <div className="relative w-32 h-32 mb-4 self-center cursor-pointer shadow-lg overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>

                    {imageFileUplodingProgress && (
                        <CircularProgressbar value={imageFileUplodingProgress || 0}
                            // text={`${imageFileUplodingProgress}%`}

                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    color: "red",
                                },
                                path: {
                                    stroke: `rgba(217, 38, 52,${imageFileUplodingProgress / 100})`,
                                },
                            }}

                        />
                    )
                    }

                    <img src={imageFileUrl || currentUser.profilePicture} alt="UserProfile" className={` rounded-full w-full h-full border-4 object-cover border-blue-500  ${imageFileUplodingProgress && imageFileUplodingProgress < 100 && 'opacity-50'}`} />
                </div>

                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}



                <TextInput type='text' id="username" placeholder="Username" defaultValue={currentUser.username} />
                <TextInput type='email' id="email" placeholder="Email" defaultValue={currentUser.email} />
                <TextInput type='password' id="password" placeholder="password" />
                <Button type="submit" className="bg-gradient-to-r from-red-600 to-blue-600 " outline>
                    Update
                </Button>
                <div className="text-red-500 flex justify-between mt-5">
                    <span className="cursor-pointer">Delete account</span>
                    <span className="cursor-pointer">Sign Out</span>
                </div>
            </form>
        </div>
    )
}

export default DashProfile
