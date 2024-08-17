import { apiSlice } from './apiSlice'
const JOBS_URL = "/api/jobs";
const USERS_URL = "api/users";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}`,
        method: "GET",
        credentials:"include"
      })
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resume`,
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    })
  })
})

export const { useGetJobMutation, useApplyJobMutation } = jobsApiSlice;