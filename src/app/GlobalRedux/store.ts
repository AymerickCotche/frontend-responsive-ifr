'use client';

import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './Features/display/displaySlice';
import loginReducer from './Features/login/loginSlice';

export const store = configureStore({
    reducer: {
      display: displayReducer,
      login: loginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;