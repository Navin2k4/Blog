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
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to <span className="text-red-600">Simpleone</span> Chronicles</h1>
        <p className="text-gray-500 text-xs lg:text-lg">Here you will find the various number of articles and many topics related to the blog content and tutorials and many more for the further purpose the blog will be developed to see the othe articles and content</p>
        <Link to='/search' className='text-sm sm:text-sm text-teal-500 font-bold hover:underline'>View all post</Link>
      </div>
      <div className='p-4 bg-amber-100 dark:bg-slate-700 lg:px-40 md:px-20 px-3'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6 items-center justify-center'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
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
