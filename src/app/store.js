import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../store/filtersSlice'
import seatsReducer from '../store/seatsSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    seats: seatsReducer,
  },
})
