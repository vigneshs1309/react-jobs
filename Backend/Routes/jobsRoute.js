import express from 'express';
import { protect } from '../middleware/authMiddleware.js'
import verifyRoles from '../middleware/verifyRoles.js'
import ROLES_LIST from '../config/roles_list.js'
const router = express.Router();
import { getJobs, getAJob, createJob, updateJob, deleteJob} from '../controllers/jobsController.js';

router
  .route('/')
  .get(getJobs)

router
  .route('/:id')
  .get(protect,getAJob)
  .put(protect,verifyRoles(ROLES_LIST.Recruiter),updateJob)
  .delete(deleteJob)

router
  .route('/create')
  .post(createJob)

export default router