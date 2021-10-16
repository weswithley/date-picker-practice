import moment from "moment";

export const creatYearList = current => {
  const firstYear = Math.floor(current['y'] / 10) * 10; // first year in a decade.
  const startYear = firstYear - 1; // starting loop year.
  const endYear = (Math.floor(current['y'] / 10) + 1) * 10; // ending loop year.
  const lastYear = endYear - 1; // last year in a decade.
  let finalYearList = [];

  for(let i = startYear ; i <= endYear ; i ++){
    const currentDateFormat = i + current['moment'].format('/MM/DD');
    const yearObj = {
      moment: moment(currentDateFormat).clone(),
      year: i,
      isInDecade: i >= firstYear && i <= lastYear,
      isThisYear: moment().format('YYYY') == i,
      selected: current['y'] == i
    }

    finalYearList.push(yearObj);
  }

  return finalYearList
}

export const creatMonthList = current => {
  const finalMonthList = moment.monthsShort().map(monthShort => {
    const monthObj = {
      moment: current['moment'].clone().month(monthShort),
      month: monthShort,
      isThisMonth: moment().format('MMM') == monthShort,
      selected: current['m'] == monthShort
    }

    return monthObj
  })

  return finalMonthList
}

export const creatDateList = date => {
  const momentObj = !date ? moment() : moment(date);
  const orderList = getOrderList(date);
  const daysInMonth = momentObj.daysInMonth();
  const daysInMonthList = transNumsIntoArray(daysInMonth).map(day => day);
  const firstDayInMonth = momentObj.clone().startOf('month');

  const finalDateList = orderList.map(dayNum => {
    const addingDate = firstDayInMonth.clone().add(dayNum, 'days');
    const dateObj = {
      moment: moment(addingDate),
      date: addingDate.format('YYYY-MM-DD'),
      y: addingDate.format('YYYY'),
      m: addingDate.format('MMM'),
      d: addingDate.format('D'),
      isInMoth: daysInMonthList.indexOf(dayNum) != -1,
      isToday: moment().isSame(addingDate, 'date'),
      isFirstDayInMonth: firstDayInMonth.isSame(addingDate, 'date'),
      selected: momentObj.isSame(addingDate, 'date')
    }

    return dateObj
  })

  return finalDateList
}

export const getOrderList = (date) => {
  // Get an array like [ -3, -2, -1, 0, 1, ... ].
  const momentObj = !date ? moment() : moment(date);
  const daysInMonth = momentObj.daysInMonth();
  const firstWeekDayInMonth = momentObj.startOf('month').day();
  const endWeekDayInMonth = momentObj.endOf('month').day();
  const daysInMonthList = transNumsIntoArray(daysInMonth).map(day => day);
  const additionDateBeforeStart = transNumsIntoArray(firstWeekDayInMonth).map(day => day - firstWeekDayInMonth);
  const additionDateAfterEnd = transNumsIntoArray(6 + 7 - endWeekDayInMonth).map(day => daysInMonthList[daysInMonthList.length - 1] + day + 1);
  const orderList = additionDateBeforeStart.concat(daysInMonthList, additionDateAfterEnd);

  return orderList
}

export const transNumsIntoArray = num => {
  return [...Array(num).keys()]
}