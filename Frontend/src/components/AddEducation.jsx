import { React, useState } from 'react';
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react';
import { FaPlusCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useProfileQuery, useAddEducationMutation } from '../features/profileApiSlice'
import { toast } from 'react-toastify';

const AddEducation = () => {
  const [open, setOpen] = useState(false);
  const [education, setEducation] = useState({
    institution: '',
    duration: ''
  });

  const { userInfo } = useSelector((state) => state.auth);
  const { refetch } = useProfileQuery(userInfo._id);
  const [ AddEducation ] = useAddEducationMutation();


  const handleOpen = () => { setOpen(!open) };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setEducation({
      ...education,
      [name]:value
    });  
  }

  const handleSubmit = async () => {
    
    const educationData = {
      id: userInfo._id,
      education
    }

    try {
      const res = await AddEducation(educationData).unwrap();
      handleOpen();
      refetch();
      toast.success("Education Added Successfully");
    } catch (error) {
      console.log(error);
    }

    setEducation({
      institution: '',
      duration: ''
    });
  }

  return (
    <>
      <FaPlusCircle 
        onClick={handleOpen}
        className="ml-auto h-full w-6 text-indigo-700 cursor-pointer"
      />
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount:{ scale: 0.9, y: -100},
        }}
      >
      <DialogHeader>Add Your Education</DialogHeader>
        <DialogBody className='flex flex-col gap-4'>
          <Input
            variant='outlined'
            label='Institution'
            type='text'
            name='institution'
            value={education.institution}
            onChange={handleInput}
          >
          </Input>
          <Input
            variant='outlined'
            label='Duration'
            type='text'
            name='duration'
            value={education.duration}
            onChange={handleInput}
          >
          </Input>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          ><span>Cancel</span>
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={handleSubmit}
          >
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AddEducation