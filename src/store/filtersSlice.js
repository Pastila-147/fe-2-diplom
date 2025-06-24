import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    fromCityId: null,
    toCityId: null,
    dateStart: '',
    dateEnd: '',
    priceFrom: 0,
    priceTo: 10000,
    options: {
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
    },
    startTimes: {
        departure: [0, 24],
        arrival: [0, 24],
    },
    endTimes: {
        departure: [0, 24],
        arrival: [0, 24],
    },
    page: 1,
    limit: 5,
    offset: 0,
    isLoading: false,
    trains: {
        items: [],
        total_count: 0,
    }
}

export const fetchTrains = createAsyncThunk(
    'filters/fetchTrains',
    async (state) => {
        const params = {
            from_city_id: state.fromCityId,
            to_city_id: state.toCityId,
            date_start: state.dateStart,
            date_end: state.dateEnd,
            price_from: state.priceFrom,
            price_to: state.priceTo,
            have_first_class: state.options?.have_first_class,
            have_second_class: state.options?.have_second_class,
            have_third_class: state.options?.have_third_class,
            have_fourth_class: state.options?.have_fourth_class,
            have_wifi: state.options?.have_wifi,
            have_air_conditioning: state.options?.have_air_conditioning,
            start_departure_hour_from: state.startTimes?.departure?.[0],
            start_departure_hour_to: state.startTimes?.departure?.[1],
            start_arrival_hour_from: state.startTimes?.arrival?.[0],
            start_arrival_hour_to: state.startTimes?.arrival?.[1],
            end_departure_hour_from: state.endTimes?.departure?.[0],
            end_departure_hour_to: state.endTimes?.departure?.[1],
            end_arrival_hour_from: state.endTimes?.arrival?.[0],
            end_arrival_hour_to: state.endTimes?.arrival?.[1],
            limit: state.limit,
            offset: state.offset,

        }

        Object.keys(params).forEach((key) => {
            if (
                params[key] === false ||
                params[key] === null ||
                params[key] === ''
            ) {
                delete params[key]
            }
        })

        const query = new URLSearchParams(params).toString();

        const url = `https://students.netoservices.ru/fe-diplom/routes?${query}`;

        const res = await axios.get(url);
        return res.data;
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFromCityId: (state, action) => {
            state.fromCityId = action.payload
        },
        setToCityId: (state, action) => {
            state.toCityId = action.payload
        },
        setDateStart: (state, action) => {
            state.dateStart = action.payload
        },
        setDateEnd: (state, action) => {
            state.dateEnd = action.payload
        },
        setPriceRange: (state, action) => {
            const [from, to] = action.payload
            state.priceFrom = from
            state.priceTo = to
        },
        setOption: (state, action) => {
            const { name, value } = action.payload
            state.options[name] = value
        },
        setStartTimes: (state, action) => {
            state.startTimes = action.payload
        },
        setEndTimes: (state, action) => {
            state.endTimes = action.payload
        },
        setDeparture: (state, action) => {
            state.departure = action.payload
        },
        setArrival: (state, action) => {
            state.arrival = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrains.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTrains.fulfilled, (state, action) => {
                state.trains = action.payload;
                state.isLoading = false
            })
            .addCase(fetchTrains.rejected, (state, action) => {
                state.isLoading = false
                state.trainsQueryError = action.error.message;
            })
            ;
    },
})

export const {
    setFromCityId,
    setToCityId,
    setDateStart,
    setDateEnd,
    setPriceRange,
    setOption,
    setStartTimes,
    setEndTimes,
    setDeparture,
    setArrival,
    setPage,
} = filtersSlice.actions

export default filtersSlice.reducer
