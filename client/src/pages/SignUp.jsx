import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);
  // since submitting to the database takes time we need to use the asynf function for submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out all fields");
    }

    let data; // Define data outside the try-catch block

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      data = await res.json(); // Assign data within the try block

      if (data.success === false) {
        if (data.message.includes("duplicate key error collection")) {
          if (data.message.includes("email_1")) {
            setErrorMessage("Email is already in use");
          } else if (data.message.includes("username_1")) {
            setErrorMessage("Username is already taken");
          }
        } else {
          setErrorMessage(data.message); // Handle other types of errors
        }
        setLoading(false);
        return; // Return here to stop further execution if there's an error
      }
      if (res.ok) {
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (error) {
      // You can access data here if an error occurred during JSON parsing
      if (data) {
        setErrorMessage(data.message); // Handle other types of errors using data
      } else {
        setErrorMessage("An error occurred while signing up. Please try again later.");
      }
      setLoading(false);
    }
  };


  return (
    <section className="mb-40 mt-10 md:mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10">
        <div className="flex-1">
          <Link
            to="/"
            className="tracking-widest text-4xl font-bold dark:text-white leading-normal"
          >
            <span className="px-2 py-1  bg-gradient-to-r from-blue-600 via-violet-600 to-red-600 rounded-lg text-white mr-2 ">
              InkWhisper
            </span>
            <br /> Chronicles
          </Link>
          <p className="mt-5 text-l leading-relaxed ">
            Welcome to InkWhisper Chronicles! Dive into captivating tales where
            imagination knows no bounds. Begin your unforgettable journey today.
            <span className="font-semibold text-red-600 leading-relaxed">
              Sign up with your email and password
            </span>
          </p>
        </div>

        <div className="flex-1 bg-violet-50 p-5 rounded-2xl shadow-lg ring-1 ring-slate-600/5 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className=""
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                className=""
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                className=""
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 underline">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
