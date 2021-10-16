// action
import moment from 'moment';
import { actionFilterList } from '../action/action';

// toolkit
import { creatDateList, creatMonthList, creatYearList } from '../toolkit/toolkit';

export const mainReducer = (state, action) => {
  let newDateList = [];
  let newMonthList = [];
  let newYearList = [];
  let newCurrentDate = null;

  switch (action.type) {
    // DATE
    case actionFilterList['INIT_DAY']:
      const specificMoment = {
        year: action['year'] ? action['year']['moment'] : null,
        month: action['month'] ? action['month']['moment'] : null,
        date: action['date'] ? action['date']['moment'] : null,
      }
      const date = specificMoment['year'] || specificMoment['month'] || specificMoment['date'] || moment();

      newDateList = creatDateList(date);
      return newDateList
    case actionFilterList['PICK_DATE']:
      newDateList = action['list'].map((date) => {
        date['selected'] = false;
        if(date['moment'].isSame(action['date']['moment'], 'date')){
          date['selected'] = true;
        }
        return date
      })
      return newDateList
    case actionFilterList['PREV_MONTH']:
      newDateList = creatDateList(moment(action['current']['moment']).subtract(1, 'month'));
      return newDateList
    case actionFilterList['NEXT_MONTH']:
      newDateList = creatDateList(moment(action['current']['moment']).add(1, 'month'));
      return newDateList

    // MONTH
    case actionFilterList['INIT_MONTH']:
      const currentMonth = action['year'] || action['current'];
      newMonthList = creatMonthList(currentMonth);
      return newMonthList
    case actionFilterList['PICK_MONTH']:
      newMonthList = action['list'].map((month) => {
        month['selected'] = false;
        if(month['month'] == action['month']['month']){
          month['selected'] = true;
        }
        return month
      })
      return newMonthList
    case actionFilterList['PREV_YEAR']:
      newDateList = creatDateList(moment(action['current']['moment']).subtract(1, 'year'));
      return newDateList
      case actionFilterList['NEXT_YEAR']:
      newDateList = creatDateList(moment(action['current']['moment']).add(1, 'year'));
      return newDateList

    // YEAR
    case actionFilterList['INIT_YEAR']:
      const currentYear = action['current'];
      newYearList = creatYearList(currentYear);
      return newYearList
    case actionFilterList['PICK_YEAR']:
      newYearList = action['list'].map((year) => {
        year['selected'] = false;
        if(year['year'] == action['year']['year']){
          year['selected'] = true;
        }
        return year
      })
      return newYearList

    // Current Date
    case actionFilterList['INIT_CURRENT_DATE_BY_DAY']:
      newCurrentDate = Object.assign({}, action["date"]);
      return newCurrentDate
    case actionFilterList['INIT_CURRENT_DATE']:
      newCurrentDate = action['list'].filter(date => date['isFirstDayInMonth'])[0];
      return newCurrentDate

    // display
    case actionFilterList['DISPLAY']:
      let calendarDisplay = Object.assign({}, action["status"]);
      return calendarDisplay;
  }
}