import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import { useState, useEffect } from 'react';
const Home = () => {

  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`api/post/getposts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPost();
  }, []);

  return (
    <div>
      <div className='flex flex-col items-center px-3 lg:flex-row md:px-24'>
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
          <h1 className="text-3xl font-bold lg:text-6xl">Welcome to <span className="text-[#5ac32e] leading-">Urban</span> Uplift</h1>
          <p className="text-gray-500 text-sm leading-6 lg:text-lg lg:leading-8 mr-0 lg:mr-5 text-justify dark:text-gray-200">
            At<span className='text-green-400 font-bold'> Urban Uplift</span>, we're dedicated to driving positive change and enhancing the quality of urban life. Our platform serves as a comprehensive resource center, offering a wealth of articles, tutorials, and insightful content focused on addressing urban challenges and fostering community empowerment.
          </p>
          <Link to='/search' className='text-sm sm:text-sm text-green-400  font-bold hover:underline'>View all post</Link>
        </div>
        <div className=' max-h-2xl hidden lg:block'>
          <img src='https://firebasestorage.googleapis.com/v0/b/blog-2fbac.appspot.com/o/Res%2Fmainimage.png?alt=media&token=2cf11585-4cea-4494-959e-ee1499ae81f4' />
        </div>
      </div>
      <div className='p-4 bg-green-300 dark:bg-slate-700 lg:px-28 lg:py-20 md:px-20 px-3'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6 items-center justify-center '>
              <h2 className='text-2xl font-semibold text-center m-5'>Recent Posts</h2>
              <div className='flex flex-wrap gap-4 justify-center items-center'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
                }
              </div>
            </div>
          )
        }
        <Link to='/search' className='text-lg text-teal-500 hover:underline  text-center'> View all posts</Link>
      </div>
    </div>
  )
}

export default Home
