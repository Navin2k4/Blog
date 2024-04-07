import { FileInput, Select, TextInput, Button } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function CreatePost() {
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

        <div className='flex items-center justify-between border-2 border-gray-500 rounded-xl p-3'>
          <FileInput type='file' accept='images/*' />
          <Button type='button' className='bg-gradient-to-r from-red-600 to-blue-600' size='sm' outline>Upload Image</Button>
        </div>
        <ReactQuill theme="snow" placeholder='Your Content goes here' className='h-72 mb-12' />

        <Button type='submit' className='bg-gradient-to-r from-blue-600 via-violet-600 to-red-600' >Publish</Button>

      </form>
    </div>
  )
}

export default CreatePost
