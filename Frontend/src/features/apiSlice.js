import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes:['applied','profile'],
  endpoints: (builder) => ({}),
});
