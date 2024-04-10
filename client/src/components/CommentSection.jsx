import { Textarea, Button, Alert, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setcommentToDelete] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  }


  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();

  }, [postId])


  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`,
        {
          method: 'PUT',
        });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.map((comment) =>
          comment._id === commentId ? {
            ...comment,
            likes: data.likes,
            numberOfLikes: data.likes.length,
          } : comment
        ));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? {
          ...c,
          content: editedContent
        } : c)
    )
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`,
        {
          method: 'DELETE',
        });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {
        currentUser ?
          (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
              <p>Signed in as : </p>
              <img className='w-5 h-5 object-cover rounded-full' src={currentUser.profilePicture} alt='user profile' />
              <Link className='text-xs text-cyan-600 hover:underline' to='/dashboard?tab=profile'>
                @{currentUser.username}
              </Link>
            </div>
          ) :
          (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
              You must be logged in to Comment.
              <Link className='text-blue-500' to={'/sign-in'}>
                Sign In
              </Link>
            </div>
          )
      }

      {
        currentUser &&
        (
          <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
            <Textarea
              placeholder='Add a comment...'
              rows='3'
              maxLength='200'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
              <p className='text-gray-500 text-sm'>{200 - comment.length} characters remaining</p>
              <Button outline gradientDuoTone='purpleToPink' type='submit'>
                Submit
              </Button>
            </div>
            {commentError &&
              <Alert color='failure' className='mt-5'>
                {commentError}
              </Alert>
            }
          </form>
        )}
      {
        comments.length === 0 ?
          (
            <p className='text-sm my-5'>No comments yet</p>
          ) :
          (
            <>
              <div className='text-sm my-5 flex items-center gap-2'>
                <p className='text-red-500'>Comments</p>
                <div className='border border-gray-400 py-1 px-3 rounded-sm'>
                  <p>{comments.length}</p>
                </div>
              </div>
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  onLike={handleLike}
                  onEdit={handleEdit}
                  onDelete={(commentId) => {
                    setShowModal(true)
                    setcommentToDelete(commentId)
                  }}
                />
              ))}
            </>
          )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' >
        <Modal.Header className="ml-2">Delete User</Modal.Header>
        <Modal.Body className="">
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this Comment?</h3>
          </div>
          <div className="flex gap-4 justify-center">
            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>Yes, Delete</Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CommentSection
