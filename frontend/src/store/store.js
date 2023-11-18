import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice';
import adminSlice from './slices/adminSlice';
import productSlice from './slices/productSlice';
import vendorSlice from './slices/vendorSlice';
const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
    product: productSlice,
    vendor:vendorSlice
  },
})

export default store;
