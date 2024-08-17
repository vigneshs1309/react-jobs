import { useAppliedQuery, useRevokeJobMutation } from '../features/userApiSlice';
import { useSelector, useDispatch } from 'react-redux'
import { removeAppliedJob } from '../features/authSlice'
import { toast } from 'react-toastify'
import {
  Typography, 
  Button,
} from '@material-tailwind/react'

const TABLE_HEAD = ["Title", "Location", "Company", "Salary",""];

const UserApplied = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data:appliedJobs,
    isSuccess,
    error
  } = useAppliedQuery(userInfo._id);

  const [ revokeJob ] = useRevokeJobMutation();

  const revokeApplication = async (id) => {
    
    const applicationDetails = {
      jobId: id,
      userId: userInfo._id
    }
    const res = await revokeJob(applicationDetails).unwrap();
    if (res) {
      dispatch(removeAppliedJob(id))
      toast.success("Application Removed")
    }
  }

  
  return (
    <>
    {isSuccess && appliedJobs.length !== 0 ?
      (
        // <Card className='h-full w-full rounded-none shadow-none'>
        <table className='w-full min-w-fit table-auto text-left border-2 border-indigo-50'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-b bg-indigo-700 p-4'
                >
                  <Typography
                    variant='small'
                    color='white'
                    className='font-medium leading-none'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job, index) => {
              const isLast = index === appliedJobs.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-indigo-200'
              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='black'
                      className='font-normal'
                    >
                      {job.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='black'
                      className='font-normal'
                    >
                      {job.location}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='black'
                      className='font-normal'
                    >
                      {job.company.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='black'
                      className='font-normal'
                    >
                      {job.salary}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      className='bg-indigo-700'
                      onClick={() => {revokeApplication(job._id)}}
                    > 
                      Revoke
                    </Button>
                  </td>
                </tr>
              )
              })
            }
          </tbody>
        </table>
      //</Card>
      ):(
        <Typography
            variant='lead'
            color='red' 
            className='text-center font-bold'
          >
          No Jobs Applied  
      </Typography>
    )}
    </>
  )
}

export default UserApplied