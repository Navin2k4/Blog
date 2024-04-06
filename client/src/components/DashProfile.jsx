import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux"
function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 mb-4 self-center cursor-pointer shadow-lg overflow-hidden rounded-full">
                    <img src={currentUser.profilePicture} alt="UserProfile" className="rounded-full w-full h-full border-4 object-cover border-blue-500  " />
                </div>
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
