// library
import React, { useEffect, useReducer } from 'react';
import moment from 'moment';

// context
import { mainContext, mainEnum } from '../context/context';

// action
import { actionFilterList } from '../action/action';

// components
import { CalendarYear } from './CalendarYear';
import { CalendarMonth } from './CalendarMonth';
import { CalendarDay } from './CalendarDay';

// scss
import calendarStyle from '../scss/calendar.scss';

export const Calendar = (props) => {
  const {
    getSelectedDate,
    toggleStatus,
    updatedCalender
  } = props;

  const {
    defaultCalendarDisplay,
    defaultFinalDate,
    defaultCurrentDate,
    defaultWeekDayList,
    defaultDateList,
    defaultMonthList,
    defaultYearList,
    mainReducer
  } = mainEnum;

  const [ newFinalDate, finalDateReducerDispatch ] = useReducer(mainReducer, defaultFinalDate);
  const [ newCurrentDate, currentDateReducerDispatch ] = useReducer(mainReducer, defaultCurrentDate);
  const [ newDateList, mainReducerDispatch ] = useReducer(mainReducer, defaultDateList);
  const [ newMonthList, mainMonthReducerDispatch ] = useReducer(mainReducer, defaultMonthList);
  const [ newYearList, mainYearReducerDispatch ] = useReducer(mainReducer, defaultYearList);
  const [ newCalendarDisplay, mainDisplayReducerDispatch ] = useReducer(mainReducer, defaultCalendarDisplay);

  const context = {
    defaultWeekDayList,
    newFinalDate,
    newCurrentDate,
    newDateList,
    newMonthList,
    newYearList,
    newCalendarDisplay,
    finalDateReducerDispatch,
    currentDateReducerDispatch,
    mainReducerDispatch,
    mainMonthReducerDispatch,
    mainYearReducerDispatch,
    mainDisplayReducerDispatch
  };

  const toggleDayModal = (status) => {
    const action = {
      type: actionFilterList["DISPLAY"],
      status,
    };

    mainDisplayReducerDispatch(action);
  };


  const switchDayModal = (toggleStatus) => {
    return { day: toggleStatus, month: false, year: false };
  };

  useEffect(() => {
    toggleDayModal(switchDayModal(toggleStatus));
  },[toggleStatus])

  useEffect(() => {
    getSelectedDate(newFinalDate);
  }, [newFinalDate]);

  useEffect(() => {
    if(!updatedCalender){ return }

    const updatedCalenderList = newDateList.map(calendar => {
      if(calendar['date'] == updatedCalender){

      }
      return calendar
    })

    const updatedDate = moment(updatedCalender);
    const firstDayInMonth = updatedDate.clone().startOf('month');
    const date = {
      moment: updatedDate,
      date: updatedDate.format('YYYY-MM-DD'),
      y: updatedDate.format('YYYY'),
      m: updatedDate.format('MMM'),
      d: updatedDate.format('D'),
      isInMoth: true,
      isToday: moment().isSame(updatedDate, 'date'),
      isFirstDayInMonth: firstDayInMonth.isSame(updatedDate, 'date'),
      selected: true
    }

    const actionInitDate = {
      type: actionFilterList["INIT_DAY"],
      date
    };

    mainReducerDispatch(actionInitDate);

    const actionDate = {
      type: actionFilterList["INIT_CURRENT_DATE"],
      list: newDateList
    };

    currentDateReducerDispatch(actionDate);

  }, [updatedCalender]);

  return (
    <mainContext.Provider value={ context }>
      <div className={calendarStyle['calendar-main-wrap']}>
        <CalendarYear></CalendarYear>
        <CalendarMonth></CalendarMonth>
        <CalendarDay></CalendarDay>
      </div>
    </mainContext.Provider>
  );
};