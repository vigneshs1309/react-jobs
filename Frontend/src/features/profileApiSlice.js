import { apiSlice } from './apiSlice';
const USER_URL = "/api/users";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    profile: builder.query({
      query: (id) => ({
        url: `${USER_URL}/profile/${id}`,
        credentials: 'include'
      }),
      providesTags:['profile']
    }),
    
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile/${data.id}`,
        body: data.profile,
        method: "POST",
        credentials: 'include'
      }),
      invalidatesTags:['profile']
    }),

    addExperience: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/add-experience/${data.id}`,
        body: data.experience,
        method: "POST",
        credentials: 'include'
      }),
      invalidatesTags:['profile']
    }),

    addEducation: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/add-education/${data.id}`,
        body: data.education,
        method: "POST",
        credentials: 'include'
      }),
      invalidatesTags:['profile']
    })
  })
})

export const { useProfileQuery, useUpdateProfileMutation, useAddExperienceMutation, useAddEducationMutation } = profileApiSlice;