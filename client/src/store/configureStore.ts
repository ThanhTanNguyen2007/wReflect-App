import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export type RootState = ReturnType<typeof rootReducer>;

export default function () {
  return configureStore({
    reducer: rootReducer,
  });
}
