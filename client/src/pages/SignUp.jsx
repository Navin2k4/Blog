import { Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const SignUp = () => {
  return (
    <section className="min-h mt-10 md:mt-20">
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
              {" "}
              Let your journey begin.
            </span>
          </p>
        </div>

        <div className="flex-1 bg-violet-50 p-5 rounded-2xl shadow-lg ring-1 ring-slate-600/5 ">
          <form className="flex flex-col gap-3">
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className=""
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
                className=""
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="text"
                placeholder="Password"
                id="password"
                className=""
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up{" "}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
