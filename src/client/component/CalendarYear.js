// library
import React, { useContext, useEffect } from 'react';

// context
import { mainContext } from '../context/context';

// action
import { actionFilterList } from '../action/action';

// component
import { CalendarTriangle } from "./CalendarTriangle";

// scss
import calendarYearStyle from '../scss/calendarYear.scss';

// fontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const CalendarYear = () => {
  const {
    newCalendarDisplay,
    newDateList,
    newMonthList,
    newYearList,
    newCurrentDate,
    mainYearReducerDispatch,
    mainMonthReducerDispatch,
    mainReducerDispatch,
    mainDisplayReducerDispatch
  } = useContext(mainContext);

  const firstYear = newCurrentDate ? Math.floor(newCurrentDate["y"] / 10) * 10 : 0; // first year in a decade.
  const lastYear = newCurrentDate ? (Math.floor(newCurrentDate["y"] / 10) + 1) * 10 - 1 : 0; // last year in a decade.
  const yearTitle = firstYear == 0 ? "" : firstYear + '-' + lastYear;

  const pickYear = (e, year) => {
    e.preventDefault();

    const actionYear = {
      type: actionFilterList["PICK_YEAR"],
      list: newYearList,
      year
    };

    const actionMonth = {
      type: actionFilterList["INIT_MONTH"],
      current: newCurrentDate,
      year
    };

    const actionReInitDate = {
      type: actionFilterList["INIT_DAY"],
      month: newCurrentDate,
      year
    };

    mainYearReducerDispatch(actionYear);
    mainMonthReducerDispatch(actionMonth);
    mainReducerDispatch(actionReInitDate);
    toggleYearModal(e, switchYearToMonth());

  }

  const prevDecade = e => {
    e.preventDefault();

    const action = {
      type: actionFilterList["PREV_YEAR"],
      current: newCurrentDate,
    };

    mainReducerDispatch(action);
  };

  const nextDecade = e => {
    e.preventDefault();

    const action = {
      type: actionFilterList["NEXT_YEAR"],
      current: newCurrentDate,
    };

    mainReducerDispatch(action);
  };

  const toggleYearModal = (e, status) => {
    e.preventDefault();

    const action = {
      type: actionFilterList["DISPLAY"],
      status,
    };

    mainDisplayReducerDispatch(action);
  }

  const switchYearToMonth = () => {
    return { day: false, month: true, year: false };
  };

  useEffect(() => {
    if (!newCurrentDate) { return }

    const actionYear = {
      type: actionFilterList["INIT_YEAR"],
      current: newCurrentDate,
    };

    mainYearReducerDispatch(actionYear);
  }, [newCurrentDate])

  return (
    <div className={`${calendarYearStyle['calendar-wrap']} ${( !newCalendarDisplay['year'] ? calendarYearStyle['close'] : '' )}`}>
      <CalendarTriangle></CalendarTriangle>
      <div className={calendarYearStyle['calendar-header']}>
        <a className={calendarYearStyle['calendar-button']} href='#' onClick={ e => prevDecade(e) }>
          <FontAwesomeIcon icon={ faChevronLeft }></FontAwesomeIcon>
        </a>

        <a className={calendarYearStyle['calendar-title']} href="#">{ yearTitle }</a>

        <a className={calendarYearStyle['calendar-button']} href='#' onClick={ e => nextDecade(e) }>
          <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
        </a>
      </div>

      <div className={calendarYearStyle['calendar-body']}>
        {
          newYearList.map((year, index) => {
            const yearStyle = {
              color: !year['isInDecade'] ? '#ccc' : (year['selected'] ? '#fff' : year['isThisYear'] ? '#db3d44' : '#888')
            };

            return (
              <a
                className={ year['selected'] ? calendarYearStyle['selected'] : null }
                style={ yearStyle }
                key={ year['year'] + '-' + index }
                href='#'
                onClick={ e => year['isInDecade'] && pickYear(e, year) }
              >
                { year['year'] }
              </a>
            );
          })
        }
      </div>
    </div>
  );
};