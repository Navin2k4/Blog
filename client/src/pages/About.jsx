import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className='min-h-screen flex items-center '>
      <div className='max-w-2xl  mx-auto p-3 text-center'>
        <div>
          <Link
            to="/"
            className="tracking-widest text-4xl font-bold dark:text-white leading-normal"
          >
            <span className="px-2 py-1  bg-gradient-to-r from-blue-600 via-violet-600 to-red-600 rounded-lg text-white mr-2 ">
              SimpleOne
            </span> Chronicles
          </Link>
          <div className='text-md text-gray-500 flex flex-col gap-7 mt-10'>
            <p>
              Welcome to SimpleOne Chronicles Blog! This blog was created by Navin Kumaran
              as a personal project to share his thoughts and ideas with the
              world. Sahand is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you will find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other peoples comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
