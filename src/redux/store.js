import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlices'; // 暂时用一个例子

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    // 以后可以在这里添加更多 slice
  },
});