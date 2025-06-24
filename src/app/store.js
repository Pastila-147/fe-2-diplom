import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../store/filtersSlice'
import seatsReducer from '../store/seatsSlice'
import passengersReducer from '../store/passengersSlice'
import paymentReducer from "../store/paymentSlice"
import orderReducer from "../store/orderSlice"
import loadingReducer from "../store/loadingSlice"
import summaryReducer from '../store/summarySlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    seats: seatsReducer,
    passengers: passengersReducer,
    payment: paymentReducer,
    order: orderReducer,
    loading: loadingReducer,
    // summary: summaryReducer,
  },
})
