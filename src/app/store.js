import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../store/filtersSlice'
import seatsReducer from '../store/seatsSlice'
import passengersReducer from '../store/passengersSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    seats: seatsReducer,
    passengers: passengersReducer,
  },
})
