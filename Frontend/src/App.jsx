import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import Unauthorized from './pages/Unauthorized';
import JobPage, {jobLoader } from './pages/JobPage'; //{jobLoader}
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import UserProfile from './pages/UserProfile';
import UpdateProfile from './pages/UpdateProfile';

const App = () => {
  // Add New Job
  const addJob = async (newJob) =>{
    axios.post("http://localhost:3500/api/jobs/create",newJob)
     .then(result => null)
     .catch(err => console.log(err))
    return;
  };
  
  //Delete Job
  const deleteJob = async (id) => {
    const res = await axios.delete(`http://localhost:3500/api/jobs/${id}`);
    return;
  }

  //update Job
  const updateJob = async (job) => {
    try {
      const res = await axios.put(`http://localhost:3500/api/jobs/${job.id}`, job);
    } catch (error) {
      console.log(error)
    }
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage /> } />
        <Route index element={<HomePage />}/>
        <Route path='/jobs' element={<JobsPage />}/>
        <Route path='/add-job' element={
            <RequireAuth>
              <AddJobPage addJobSubmit={addJob} />
            </RequireAuth>}
        />
        <Route path='/jobs/:id' element={
            <RequireAuth>
              <JobPage deleteJob={deleteJob} />
            </RequireAuth>
            } loader = {jobLoader}
        />
        <Route path='/edit-job/:id' element={
          <RequireAuth>
            <EditJobPage updatedJobSubmit={updateJob} />
          </RequireAuth>}
          loader={jobLoader} />
        <Route path='/user-profile' element={ <UserProfile />} />
        <Route path='/edit-profile' element={ <UpdateProfile />} />
        <Route path='/unauthorized' element={<Unauthorized />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />
};

export default App