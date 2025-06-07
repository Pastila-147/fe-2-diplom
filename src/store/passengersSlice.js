import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    passengersCount: {
        adult: 1,
        child: 0,
        baby: 0,
    },
    passengersPrice: {
        departure: { adult: 0, child: 0, services: 0 },
        arrival: { adult: 0, child: 0, services: 0 },
    },
    passengers: [],
};

const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {
        passengersCountChange: (state, { payload }) => {
            const { type, count } = payload;
            state.passengersCount[type] = Number(count);
        },
        passengersPriceChange: (state, { payload }) => {
            const { typeTicket, type, price } = payload;
            state.passengersPrice[typeTicket][type] = price;
        },
        passengersPriceClear: (state) => {
            state.passengersPrice = {
                departure: { adult: 0, child: 0, services: 0 },
                arrival: { adult: 0, child: 0, services: 0 },
            };
        },
        setInitialPassengers: (state, { payload }) => {
            state.passengers = payload;
        },
        updatePassengerData: (state, { payload }) => {
            const { id, changes } = payload;
            const passenger = state.passengers.find(p => p.id === id);
            if (passenger) {
                Object.assign(passenger, changes);
            }
        }
    },
});

export const {
    passengersCountChange,
    passengersPriceChange,
    passengersPriceClear,
    setInitialPassengers,
    updatePassengerData,
} = passengersSlice.actions;

export default passengersSlice.reducer;
