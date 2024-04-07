/* eslint-disable no-unused-vars */
import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

function CreatePost() {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-xl my-7 font-semibold tracking-widest ">Create A Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput required type='text' placeholder='Title' id='title' className='flex-1 ' />
          <Select>
            <option value='uncatagorized'>Select a Category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React JS</option>
            <option value='nextjs'>Next JS</option>
          </Select>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row items-center justify-between border-2 border-gray-500 rounded-xl p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className='text-gray-400'>(Any image format) Max size: 5 MB</p>

          <Button
            type='button'
            className='bg-gradient-to-r from-red-600 to-blue-600'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}

          </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>
            {imageUploadError}
          </Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover" />
        )}

        <ReactQuill
          theme="snow"
          placeholder='Your Content goes here' className='h-72 mb-12'
          required />

        <Button type='submit' className='bg-gradient-to-r from-blue-600 via-violet-600 to-red-600' >Publish</Button>

      </form>
    </div>
  )
}

export default CreatePost
