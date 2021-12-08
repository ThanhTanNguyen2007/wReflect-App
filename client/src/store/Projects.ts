import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types';

import { createSelector } from 'reselect';

let lastIndex = 0;

const slice = createSlice({
  name: 'projects',
  initialState: [] as Project[],
  reducers: {
    projectAdded: (projects, action: PayloadAction<Omit<Project, 'id'>>) => {
      projects.push({
        id: ++lastIndex,
        ...action.payload,
      });
    },
    projectUpdated: (projects, action: PayloadAction<Project>) => {
      const index = projects.findIndex((prj: Project) => prj.id === action.payload.id);
      projects[index] = action.payload;
    },
  },
});

export const { projectAdded, projectUpdated } = slice.actions;
export default slice.reducer;

export const getAllProjects = createSelector(
  (state: any) => state.entities.projects,
  (projects: Project[]) => projects,
);
