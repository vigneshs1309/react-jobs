import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice'
import authReducer from '../features/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
   [ apiSlice.reducerPath ]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store