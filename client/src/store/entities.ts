import { combineReducers } from '@reduxjs/toolkit';
import wsReducer from './workspaces';
import projectReducer from './Projects';

export default combineReducers({
  workSpaces: wsReducer,
  projects: projectReducer,
});
