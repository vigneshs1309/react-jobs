import React from "react";
import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import axios from 'axios';

const JobListings = ({ isHome = false, searchText }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);

  const fetchJobs = async () => {
    const URL = 'http://localhost:3500'

    axios.defaults.withCredentials = true;

    const apiUrl = isHome ? "/api/jobs?limit=3" : "/api/jobs";
    try {
      const res = await axios.get(`${URL + apiUrl}`);
      const data = res.data.data;
      setJobs(data);
      setAllJobs(data);
    } catch (error) {
      console.log("Error Fetching Data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let filteredJobs = allJobs.filter((item) => {
      return item.title.toLowerCase().includes(searchText?.toLowerCase());
    });
    searchText?.length > 1 ? setJobs(filteredJobs) : setJobs(allJobs);
  }, [searchText]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "All Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
