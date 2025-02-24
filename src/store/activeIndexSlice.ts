import { createSlice, createAction, PayloadAction, createReducer } from '@reduxjs/toolkit'
import type { RootState } from './store.ts'

interface ActiveIndexState {
  value: number
}
const initialState: ActiveIndexState = {
  value: -1
};

const setActiveIndexActionCreator = createAction('SET_ACTIVE_INDEX');

export const setActiveIndexReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveIndexActionCreator.type, (state, action) => {
      return { ...state, value: action.payload }
    })
    .addDefaultCase((state) => state)
})

export const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveIndex: setActiveIndexReducer,
  },
})

export function setActiveIndexAction(value: number) {
  return {
    type: setActiveIndexActionCreator.type,
    payload: value,
  }
}

// Action creators are generated for each case reducer function
export const { setActiveIndex } = activeIndexSlice.actions

export const selectActiveIndex = (state: RootState) => state.activeIndex.value;

export default activeIndexSlice.reducer