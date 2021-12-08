import { WorkSpace } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'workSpaces',
  initialState: [] as WorkSpace[],
  reducers: {
    wsUpdated: (workSpaces, action: PayloadAction<WorkSpace>) => {
      const index = workSpaces.findIndex((ws: WorkSpace) => ws.id === action.payload.id);
      workSpaces[index] = action.payload;
    },
  },
});

export const { wsUpdated } = slice.actions;
export default slice.reducer;
