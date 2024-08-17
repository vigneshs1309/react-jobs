import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear("userInfo");
    },
    removeAppliedJob: (state, action) => {
      const removeVal = action.payload;
      
      state.userInfo.appliedJobs = state.userInfo.appliedJobs.filter(item => item !== removeVal);  

      localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    addAppliedJob: (state, action) => {
      const addVal = action.payload;
      state.userInfo.appliedJobs.push(addVal);

      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));

    }
  },
});

export const { setCredentials, logout, removeAppliedJob, addAppliedJob } = authSlice.actions

export default authSlice.reducer