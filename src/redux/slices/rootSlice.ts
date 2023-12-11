import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        make: '',
        model: '',
        year: '',
        condition:''
    },
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseCondition: (state, action) => { state.condition = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseMake, chooseModel,chooseYear,chooseCondition} = rootSlice.actions;