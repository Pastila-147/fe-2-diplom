import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDepartureSeats = createAsyncThunk(
    'seats/fetchDepartureSeats',
    async (routeId) => {
        const res = await axios.get(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`);
        return res.data;
    }
);

export const fetchArrivalSeats = createAsyncThunk(
    'seats/fetchArrivalSeats',
    async (routeId) => {
        const res = await axios.get(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`);
        return res.data;
    }
);


const initialState = {
    train: {
        departure: null,
        arrival: null,
    },
    availableSeats: {
        departure: {
            couchesList: null,
            queryStatus: 'idle',
            queryError: null,
        },
        arrival: {
            couchesList: null,
            queryStatus: 'idle',
            queryError: null,
        },
    },
    selectedSeats: {
        departure: {
            selectedCoachClass: null,
            coachesOfSelectedClass: [],
            selectedCoachId: null,
            seats: {},
            seatsCount: 0,
            services: {},
        },
        arrival: {
            selectedCoachClass: null,
            coachesOfSelectedClass: [],
            selectedCoachId: null,
            seats: {},
            seatsCount: 0,
            services: {},
        }
    },
};

const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        resetTrain: (state) => {
            state.train.departure = null;
            state.train.arrival = null;
        },
        setTrain: (state, action) => {
            const { departureTrain, arrivalTrain } = action.payload;
            state.train.departure = departureTrain;
            state.train.arrival = arrivalTrain;
        },
        resetSeats: (state) => {
            state.availableSeats.departure.couchesList = null;
            state.availableSeats.departure.queryStatus = 'idle';
            state.availableSeats.departure.queryError = null;

            state.availableSeats.arrival.couchesList = null;
            state.availableSeats.arrival.queryStatus = 'idle';
            state.availableSeats.arrival.queryError = null;
        },
        trainAdd: (state, { payload }) => {
            state.train.departure = payload.departure;
            state.train.arrival = payload.arrival;
        },
        coachSelect: (state, { payload }) => {
            const { id, type } = payload;
            state.selectedSeats[type].selectedCoachId = id;
        },
        coachItemsClear: (state, { payload }) => {
            state.selectedSeats[payload.type].coachesOfSelectedClass = [];
            state.selectedSeats[payload.type].selectedCoach = null;
            state.selectedSeats[payload.type].seats = {};
            state.selectedSeats[payload.type].seatsCount = 0;
            state.selectedSeats[payload.type].services = {};
        },
        coachClassChange: (state, { payload }) => {
            state.selectedSeats[payload.type].selectedCoachClass = payload.coachClass;
            state.selectedSeats[payload.type].coachesOfSelectedClass = payload.coachesOfSelectedClass;
        },
        seatsItemSelect: (state, { payload }) => {
            const { id, number, type } = payload;
            if (!state.selectedSeats[type].seats[id]) state.selectedSeats[type].seats[id] = [];
            state.selectedSeats[type].seats[id].push(number);
            state.selectedSeats[type].seatsCount++;
        },
        seatsItemUnSelect: (state, { payload }) => {
            const { id, number, type } = payload;
            state.selectedSeats[type].seats[id] = state.selectedSeats[type].seats[id].filter((n) => n !== number);
            if (state.selectedSeats[type].seats[id].length === 0) delete state.selectedSeats[type].seats[id];
            state.selectedSeats[type].seatsCount--;
        },
        serviceItemSelect: (state, { payload }) => {
            const { id, service, type } = payload;
            if (!state.selectedSeats[type].services[id]) state.selectedSeats[type].services[id] = [];
            if (!state.selectedSeats[type].services[id].includes(service)) {
                state.selectedSeats[type].services[id].push(service);
            }
        },
        serviceItemUnSelect: (state, { payload }) => {
            const { id, service, type } = payload;
            if (state.selectedSeats[type].services[id]) {
                state.selectedSeats[type].services[id] = state.selectedSeats[type].services[id].filter((s) => s !== service);
                if (state.selectedSeats[type].services[id].length === 0) delete state.selectedSeats[type].services[id];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartureSeats.pending, (state) => {
                state.availableSeats.departure.queryStatus = 'loading';
            })
            .addCase(fetchDepartureSeats.fulfilled, (state, action) => {
                state.availableSeats.departure.couchesList = action.payload;
                state.availableSeats.departure.seatsQueryStatus = 'succeeded';
            })
            .addCase(fetchArrivalSeats.fulfilled, (state, action) => {
                state.availableSeats.arrival.couchesList = action.payload;
                state.availableSeats.arrival.seatsQueryStatus = 'succeeded';
            })
            .addCase(fetchDepartureSeats.rejected, (state, action) => {
                state.availableSeats.departure.queryStatus = 'failed';
                state.availableSeats.departure.queryError = action.error.message;
            })
            .addCase(fetchArrivalSeats.rejected, (state, action) => {
                state.availableSeats.arrival.queryStatus = 'failed';
                state.availableSeats.arrival.queryError = action.error.message;
            });
    },
});

export const {
    setTrain,
    resetTrain,
    resetSeats,
    trainAdd,
    coachSelect,
    coachItemsClear,
    coachClassChange,
    seatsItemSelect,
    seatsItemUnSelect,
    serviceItemSelect,
    serviceItemUnSelect,
} = seatsSlice.actions;

export default seatsSlice.reducer;
