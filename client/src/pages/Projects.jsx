import { Link } from "react-router-dom";
import CallToAction from '../components/CallToAction';

const Projects = () => {
  return (
    <div className="max-h-screen mx-auto p-20">
      <div className="flex  flex-col justify-center items-center gap-6">
        <h1 className="text-4xl">See our Recent changes</h1>
        <div className="max-w-6xl">
          <CallToAction />
        </div>
      </div>
    </div>
  )
}

export default Projects
