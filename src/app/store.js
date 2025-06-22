import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../store/filtersSlice'
import seatsReducer from '../store/seatsSlice'
import passengersReducer from '../store/passengersSlice'
import paymentReducer from "../store/paymentSlice"
import orderReducer from "../store/orderSlice"

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    seats: seatsReducer,
    passengers: passengersReducer,
    payment: paymentReducer,
    order: orderReducer,
  },
})
