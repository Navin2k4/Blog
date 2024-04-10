import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  const handleShowmore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 pt-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 rounded-lg my-2 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg border-gray-400 ">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              // eslint-disable-next-line react/jsx-key
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(post.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 rounded-sm object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}
                  </Table.Cell>

                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                      className="font-md text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="text-teal-500 hover:underline">Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showmore && (
              <button onClick={handleShowmore} className="w-full text-teal-500 self-center text-sm py-7">
                Show More
              </button>
            )
          }
        </>
      ) : (
        <p>You have no Posts</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' >
        <Modal.Header className="ml-2">Delete Post</Modal.Header>
        <Modal.Body className="">
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this Post?</h3>
          </div>
          <div className="flex gap-4 justify-center">
            <Button color='failure' onClick={handleDeletePost}>Yes, Delete</Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashPosts
