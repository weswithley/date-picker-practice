import React from 'react';

// reducer
import { mainReducer } from '../reducer/reducer';

const defaultCalendarDisplay = {
  'day': false,
  'month': false,
  'year': false
}
const defaultFinalDate = null;
const defaultCurrentDate = null;
const defaultWeekDayList = ["S", "M", "T", "W", "T", "F", "S"];
const defaultDateList = [];
const defaultMonthList = [];
const defaultYearList = [];

export const mainEnum = {
  defaultFinalDate,
  defaultCalendarDisplay,
  defaultCurrentDate,
  defaultWeekDayList,
  defaultDateList,
  defaultMonthList,
  defaultYearList,
  mainReducer
}

export const mainContext = React.createContext({});