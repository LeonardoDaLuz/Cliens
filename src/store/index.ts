import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import userReducer from './user';
import customerReducer from './customers';

const store = configureStore({
  reducer: {
    user: userReducer,
    customers: customerReducer,
  }
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;