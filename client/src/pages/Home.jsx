const Home = () => {
  return (
    <div className="bg-white">


      <section className="py-40 dark:text-gray-200 dark:bg-[rgb(16,23,42)]  text-gray-700">
        <div className="container mx-auto flex items-center justify-center">
          <div className="max-w-lg text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to SimpleOne Chronicles</h2>
            <p className="text-lg">Discover insightful articles and stories that inspire.</p>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="p-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Blog Post */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/500" alt="Blog Post" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Blog Post Title</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit odio quis lorem elementum, at lobortis lorem ultrices.</p>
                <a href="#" className="text-blue-500 font-semibold mt-4 inline-block">Read More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/500" alt="Blog Post" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Blog Post Title</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit odio quis lorem elementum, at lobortis lorem ultrices.</p>
                <a href="#" className="text-blue-500 font-semibold mt-4 inline-block">Read More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/500" alt="Blog Post" className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Blog Post Title</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit odio quis lorem elementum, at lobortis lorem ultrices.</p>
                <a href="#" className="text-blue-500 font-semibold mt-4 inline-block">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
