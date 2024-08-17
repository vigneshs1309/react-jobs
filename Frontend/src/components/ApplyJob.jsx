import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
 } from '@material-tailwind/react'
import { addAppliedJob } from '../features/authSlice';
import { useApplyjobMutation } from '../features/userApiSlice';


const ApplyJob = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const [ applyJob ] = useApplyjobMutation();

  const upload = async() => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userInfo._id);
    formData.append('jobId', id);

    const res = await applyJob(formData).unwrap();
    if (res) {
      handleOpen();
      dispatch(addAppliedJob(id));
      toast.success("Job Applied successfully");
    }
    else {
      toast.error("Something went wrong, Try again Later");
    }
  }
  
  const isApplied = userInfo.appliedJobs.includes(id);

  const handleOpen = () => {setOpen(!open)}
  return (
    <>
      <Button
        onClick={handleOpen}
        className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-3 px-4 rounded-full w-full block'
        disabled={isApplied}
      > { !isApplied ?  'Apply Job' : "Applied"}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount:{ scale: 0.9, y: -100},
        }}
      >
      <DialogHeader>Upload Your Resume</DialogHeader>
        <DialogBody>
          <Input
            variant='standard'
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
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
            onClick={upload}
          >
            <span>Apply</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default ApplyJob