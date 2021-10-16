// library
import React, { useContext, useEffect } from 'react';

// context
import { mainContext } from '../context/context';

// action
import { actionFilterList } from '../action/action';

// component
import { CalendarTriangle } from "./CalendarTriangle";

// scss
import calendarMonthStyle from '../scss/calendarMonth.scss';

// fontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const CalendarMonth = () => {
  const {
    newCalendarDisplay,
    newDateList,
    newMonthList,
    newCurrentDate,
    currentDateReducerDispatch,
    mainMonthReducerDispatch,
    mainReducerDispatch,
    mainDisplayReducerDispatch
  } = useContext(mainContext);

  const monthTitle = newCurrentDate ? newCurrentDate['moment'].format('YYYY') : '';

  const pickMonth = (e, month) => {
    e.preventDefault();

    const actionPickMonth = {
      type: actionFilterList["PICK_MONTH"],
      list: newMonthList,
      month
    };

    const actionInitDate = {
      type: actionFilterList["INIT_DAY"],
      month
    };

    mainMonthReducerDispatch(actionPickMonth);
    mainReducerDispatch(actionInitDate);
    toggleMonthModal(e, switchMonthToDay());

  }

  const prevYear = e => {
    e.preventDefault();

    const actionYear = {
      type: actionFilterList["PREV_YEAR"],
      current: newCurrentDate,
    };

    const actionMonth = {
      type: actionFilterList["INIT_MONTH"],
      current: newCurrentDate,
    };

    const actionDate = {
      type: actionFilterList["INIT_CURRENT_DATE"],
      list: newDateList,
    };

    mainReducerDispatch(actionYear);
    mainMonthReducerDispatch(actionMonth);
    currentDateReducerDispatch(actionDate);
  };

  const nextYear = e => {
    e.preventDefault();

    const action = {
      type: actionFilterList["NEXT_YEAR"],
      current: newCurrentDate,
    };

    const actionMonth = {
      type: actionFilterList["INIT_MONTH"],
      current: newCurrentDate,
    };

    const actionDate = {
      type: actionFilterList["INIT_CURRENT_DATE"],
      list: newDateList,
    };

    mainReducerDispatch(action);
    mainMonthReducerDispatch(actionMonth);
    currentDateReducerDispatch(actionDate);

  };

  const toggleMonthModal = (e, status) => {
    e.preventDefault();

    const action = {
      type: actionFilterList["DISPLAY"],
      status
    };

    mainDisplayReducerDispatch(action);
  }

  const switchMonthToDay = () => {
    return { 'day': true, 'month': false, 'year': false };
  };

  const switchMonthToYear = () => {
    return { 'day': false, 'month': false, 'year': true };
  };

  useEffect(() => {
    if(!newCurrentDate){ return }

    const actionMonth = {
      type: actionFilterList["INIT_MONTH"],
      current: newCurrentDate,
    };

    mainMonthReducerDispatch(actionMonth);
  }, [newCurrentDate]);

  return (
    <div className={`${calendarMonthStyle['calendar-wrap']} ${( !newCalendarDisplay['month'] ? calendarMonthStyle['close'] : '' )}`}>
      <CalendarTriangle></CalendarTriangle>
      <div className={calendarMonthStyle['calendar-header']}>
        <a className={calendarMonthStyle['calendar-button']} href='#' onClick={ e => prevYear(e) }>
          <FontAwesomeIcon icon={ faChevronLeft }></FontAwesomeIcon>
        </a>

        <div className={calendarMonthStyle['calendar-title']} onClick={ e => { toggleMonthModal(e, switchMonthToYear()); } }>{ monthTitle }</div>

        <a className={calendarMonthStyle['calendar-button']} href='#' onClick={ e => nextYear(e) }>
          <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
        </a>
      </div>

      <div className={calendarMonthStyle['calendar-body']}>
        {
          newMonthList.map((month, index) => {
            const monthStyle = {
              color: month['selected'] ? '#fff' : (month['isThisMonth'] ? '#db3d44' : '#888')
            };

            return (
              <a
                className={ month['selected'] ? calendarMonthStyle['selected'] : null }
                style={ monthStyle }
                key={ month['month'] + '-' + index }
                href='#'
                onClick={ e => pickMonth(e, month) }
              >
                { month['month'] }
              </a>
            );
          })
        }
      </div>
    </div>
  );
};