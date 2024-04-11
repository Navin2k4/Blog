/* eslint-disable no-unused-vars */
import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// React Geosuggest for selecting the location for posting
// import Geosuggest from '@ubilabs/react-geosuggest';


function CreatePost() {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }

    } catch (error) {
      setPublishError('Something Went Wrong');
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-2xl my-7 font-semibold tracking-widest ">Create A Request</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            required
            type='text'
            placeholder='Issue Title'
            id='title'
            className='flex-1'
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }
            }
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }
            }
          >
            <option value='uncategorized'>Select severity</option>
            <option value='critical' className=''>Critical</option>
            <option value='major' className=''>Major</option>
            <option value='minor' className=''>Minor</option>

          </Select>
        </div>
        {/* <Geosuggest
          placeholder='Select the location'
          onSuggestSelect={(suggest) => {
            console.log(suggest);
          }}          
        /> */}

        <div className='flex flex-col gap-4 sm:flex-row items-center justify-between border-2 border-gray-500 rounded-xl p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className='text-gray-400'>(Any image format) Max size: 5 MB</p>


          <Button
            type='button'
            className='bg-custom-gradient'
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
          placeholder='Describe about the issue'
          className='h-72 mb-12'
          required
          onChange={
            (value) => {
              setFormData({ ...formData, content: value });
            }
          }
        />
        <Button type='submit' className='bg-custom-gradient' >Publish Request</Button>

        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}

      </form>
    </div>
  )
}

export default CreatePost
