import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fromCityId: null,
    toCityId: null,
    dateStart: '',
    dateEnd: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchParams: (state, { payload }) => {
            state.fromCityId = payload.fromCityId;
            state.toCityId = payload.toCityId;
            state.dateStart = payload.dateStart;
            state.dateEnd = payload.dateEnd;
        },
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
    }
})

export const {
    setSearchParams,
    setFromCityId,
    setToCityId,
    setDateStart,
    setDateEnd
} = searchSlice.actions

export default searchSlice.reducer
