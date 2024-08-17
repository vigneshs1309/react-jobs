import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: 'include'
      }),
    }),
    
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
        credentials: "include"
      })
    }),
    
    applyjob: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/resume`,
        method: "POST",
        body: data,
        credentials: "include"
      }),
      invalidatesTags:['applied']
    }),

    applied: builder.query({
      query: (id) => ({
        url: `${USER_URL}/applied/${id}`,
        credentials: 'include'
      }),
      providesTags: ['applied']
    }),
    
    revokeJob: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/applied/${data.jobId}`,
        method: "POST",
        body:data,
        credentials:'include'
      }),
      invalidatesTags:['applied']
    }),  
    
    profile: builder.query({
      query: (id) => ({
        url: `${USER_URL}/profile/${id}`,
        credentials: 'include'
      })
    })

  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useRevokeJobMutation, useAppliedQuery, useProfileQuery,useApplyjobMutation } = userApiSlice;