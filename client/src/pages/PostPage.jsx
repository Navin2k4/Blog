import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {

        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl' />
        </div>
    )
    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen ">

            <h1 className="text-4xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-customGreen">{post && post.title}</h1>

            <Link className="self-center mt-5" to={`/search?category=${post && post.category}`}>
                <Button color='gray' pill size='xs' >
                    {post && post.category}
                </Button>
            </Link>

            <img className="mt-10 p-3 max-h-[600px] w-full object-cover" src={post && post.image} alt={post.title} />

            <div className="flex justify-between border-b border-slate-500 p-3 mx-auto w-full max-w-2xl text-md">
                <div className="flex flex-col gap-2">
                    <span>Created on : {post && new Date(post.createdAt).toLocaleDateString()}</span>
                    {/* <span>Updated on : {post && new Date(post.updatedAt).toLocaleDateString()}</span> */}
                </div>
                <span className="italic">
                    {post && ((post.content.length / 1000).toFixed(0)) == 0 ? 1 : ((post.content.length / 1000).toFixed(0))} mins read
                </span>
            </div>

            <div className="p-3 max-w-3xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}}>
                
            </div>

        </main>
    )
}

export default PostPage
