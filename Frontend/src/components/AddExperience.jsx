import { React, useState } from 'react';
import {
  Button,
  Textarea,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react';
import { FaPlusCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useProfileQuery,useAddExperienceMutation } from '../features/profileApiSlice'
import { toast } from 'react-toastify';

const AddExperience = () => {
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState({
    job: '',
    company: '',
    description:''
  });

  const { userInfo } = useSelector((state) => state.auth)
  const { refetch } = useProfileQuery(userInfo._id);
  const [ addExperience ] = useAddExperienceMutation();

  const handleOpen = () => { setOpen(!open) };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setExperience({
      ...experience,
      [name]:value
    });  
  }

  const handleSubmit = async () => {

    const experienceData = {
      id: userInfo._id,
      experience
    }

    try {
      const res = await addExperience(experienceData).unwrap();
      handleOpen();
      refetch();
      toast.success("Experience Added Successfully")
    } catch(error) {
      console.log(error);
    }
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
      <DialogHeader>Add Your Experience</DialogHeader>
        <DialogBody className='flex flex-col gap-4'>
          <Input
            variant='outlined'
            label='Job'
            type='text'
            name='job'
            value={experience.job}
            onChange={handleInput}
          >
          </Input>
          <Input
            variant='outlined'
            label='Company'
            type='text'
            name='company'
            value={experience.company}
            onChange={handleInput}
          >
          </Input>
          <Textarea
            variant='outlined'
            label='Description'
            name='description'
            value={experience.description}
            onChange={handleInput}
          />

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

export default AddExperience