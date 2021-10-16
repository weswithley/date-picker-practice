// library
import React, { useContext, useEffect, Fragment } from 'react';

// context
import { mainContext } from '../context/context';

// action
import { actionFilterList } from '../action/action';

// component
import { CalendarTriangle } from "./CalendarTriangle";

// scss
import calendarDayStyle from '../scss/calendarDay.scss';

// fontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const CalendarDay = () => {
  const {
    newCalendarDisplay,
    defaultWeekDayList,
    newDateList,
    newCurrentDate,
    finalDateReducerDispatch,
    currentDateReducerDispatch,
    mainReducerDispatch,
    mainDisplayReducerDispatch,
  } = useContext(mainContext);

  const dayTitle = newCurrentDate ? newCurrentDate['moment'].format('MMM YYYY') : '';

  const pickDate = (e, date) => {
    e.preventDefault();

    const actionPickDate = {
      type: actionFilterList['PICK_DATE'],
      list: newDateList,
      date
    }

    const actionCurrentDate = {
      type: actionFilterList["INIT_CURRENT_DATE_BY_DAY"],
      date,
    };

    mainReducerDispatch(actionPickDate);
    finalDateReducerDispatch(actionCurrentDate);
  }

  const prevMonth = e => {
    e.preventDefault();

    const action = {
      type: actionFilterList["PREV_MONTH"],
      current: newCurrentDate
    };

    mainReducerDispatch(action);
  };

  const nextMonth = e => {
    e.preventDefault();

    const action = {
      type: actionFilterList["NEXT_MONTH"],
      current: newCurrentDate
    };

    mainReducerDispatch(action);
  };

  const toggleMonthModal = (e, status) => {
    e.preventDefault();

    const action = {
      type: actionFilterList["DISPLAY"],
      status
    };

    mainDisplayReducerDispatch(action);
  };

  const switchDayToMonth = () => {
    return { 'day': false, 'month': true, 'year': false };
  }

  useEffect(() => {
    const action = {
      type: actionFilterList["INIT_DAY"],
    };

    mainReducerDispatch(action);
  }, []);

  useEffect(() => {
    if(newDateList.length == 0){ return }

    const actionDate = {
      type: actionFilterList["INIT_CURRENT_DATE"],
      list: newDateList
    };

    currentDateReducerDispatch(actionDate);
  }, [newDateList]);

  return (
    <div className={`${calendarDayStyle['calendar-wrap']} ${( !newCalendarDisplay['day'] ? calendarDayStyle['close'] : '' )}`}>
      <CalendarTriangle></CalendarTriangle>
      <div className={calendarDayStyle['calendar-header']}>
        <a className={calendarDayStyle['calendar-button']} href='#' onClick={ e => prevMonth(e) }>
          <FontAwesomeIcon icon={ faChevronLeft }></FontAwesomeIcon>
        </a>

        <div className={calendarDayStyle['calendar-title']} onClick={ e => { toggleMonthModal(e, switchDayToMonth()) } }>{ dayTitle }</div>

        <a className={calendarDayStyle['calendar-button']} href='#' onClick={ e => nextMonth(e) }>
          <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
        </a>
      </div>

      <div className={calendarDayStyle['calendar-body']}>
        <Fragment>
          {
            defaultWeekDayList.map((weekDay, index) => {
              return (
                <a key={ weekDay + '_' + index } href='#'>{ weekDay }</a>
              );
            })
          }
        </Fragment>
        <Fragment>
          {
            newDateList.map(date => {
              const dateStyle = {
                color: !date['isInMoth'] ? '#ccc' : (date['selected'] ? '#fff' : date['isToday'] ? '#db3d44' : '#888')
              };

              return (
                <a
                  className={ date['selected'] ? calendarDayStyle['selected'] : null }
                  style={ dateStyle }
                  key={ date['date'] }
                  href='#'
                  onClick={ e => date['isInMoth'] && pickDate(e, date) }
                >
                  { date['d'] }
                </a>
              );
            })
          }
        </Fragment>
      </div>
    </div>
  );
};