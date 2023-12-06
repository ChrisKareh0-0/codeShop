import {configureStore} from '@reduxjs/toolkit';
import SliceReducer from '../Redux/Slice';

export const Store = configureStore({
  reducer: {
    Barcode: SliceReducer,
  },
});
