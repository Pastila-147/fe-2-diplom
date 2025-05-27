import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedSeats: [],
}

const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        addSelectedSeat: (state, action) => {
            state.selectedSeats.push(action.payload)
        },
        removeSelectedSeat: (state, action) => {
            state.selectedSeats = state.selectedSeats.filter(
                (seat) => seat.seatNumber !== action.payload.seatNumber || seat.coachId !== action.payload.coachId
            )
        },
        clearSelectedSeats: (state) => {
            state.selectedSeats = []
        },
    },
})

export const {
    addSelectedSeat,
    removeSelectedSeat,
    clearSelectedSeats,
} = seatsSlice.actions

export default seatsSlice.reducer
