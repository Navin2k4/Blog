import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInStart, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {

  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector(state => state.user);


  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
              SimpleOne
            </span>
            <br /> Chronicles
          </Link>
          <p className="mt-5 text-l leading-relaxed ">
            Welcome to SimpleOne Chronicles! Dive into captivating tales where
            imagination knows no bounds. Begin your unforgettable journey today.
            <span className="font-semibold text-red-600 leading-relaxed">
              {" "}Sign in with your email and password or with Google
            </span>
          </p>
        </div>

        <div className="flex-1 bg-violet-50 p-5 rounded-2xl shadow-lg ring-1 ring-slate-600/5  dark:bg-gray-700 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                placeholder="********"
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
                "Sign In"
              )}
            </Button>

            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Don`t have an account?</span>
            <Link to="/sign-up" className="text-blue-500 underline">
              Sign Up
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

export default SignIn;
