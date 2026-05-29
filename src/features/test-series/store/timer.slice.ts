import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
  timeRemaining: number;
  isActive: boolean;
  totalTime: number;
}

const initialState: TimerState = {
  timeRemaining: 0,
  isActive: false,
  totalTime: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action) => {
      state.totalTime = action.payload;
      state.timeRemaining = action.payload;
      state.isActive = true;
    },
    tickTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining--;
      } else {
        state.isActive = false;
      }
    },
    stopTimer: (state) => {
      state.isActive = false;
    },
    resetTimer: (state) => {
      state.timeRemaining = 0;
      state.isActive = false;
      state.totalTime = 0;
    },
  },
});

export const { startTimer, tickTimer, stopTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
