import { createSlice } from '@reduxjs/toolkit'

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
}

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
} = filtersSlice.actions

export default filtersSlice.reducer
