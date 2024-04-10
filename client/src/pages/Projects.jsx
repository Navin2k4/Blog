import { Link } from "react-router-dom";
import CallToAction from '../components/CallToAction';

const Projects = () => {
  return (
    <div className='min-h-[600px] flex items-center '>
      <div className='max-w-2xl  mx-auto p-3 text-center'>
        <div>
          <h3 className="text-3xl p-3 mb-4">Know About us and our Services</h3>
          <div className="p-4 mb-5">
            <CallToAction />
          </div>
          <Link
            to="/"
            className="tracking-widest text-4xl font-bold dark:text-white leading-normal"
          >
            <span className="px-2 py-1  bg-gradient-to-r from-blue-600 via-violet-600 to-red-600 rounded-lg text-white mr-2 ">
              SimpleOne
            </span> Chronicles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Projects
