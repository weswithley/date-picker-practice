// library
import React, { Fragment, useReducer, useState } from 'react';

// Component
import { Inputer } from "./Inputer";
import { Calendar } from './Calendar';

// scss
import '../scss/style.scss';

export const App = () => {
  const defaultProps = {
    'status': false,
    'value': '',
    'calendar': null
  }
  const [ toggleStatus, statusChangeDispatch ] = useState(defaultProps['status']);
  const [ updatedValue, valueChangeDispatch ] = useState(defaultProps['value']);
  const [ updatedCalender, calendarChangeDispatch ] = useState(defaultProps['calendar']);
  const onToggleCalendar = e => {
    statusChangeDispatch(!toggleStatus);
  };

  const onChangeTrigger = value => {
    calendarChangeDispatch(value);
    statusChangeDispatch(true);
  };

  const getSelectedDate = date => {
    if(!date){ return }
    valueChangeDispatch(date['date']);
  }

  return (
    <Fragment>
      <Inputer
        updatedValue={ updatedValue }
        onClickTrigger={ onToggleCalendar }
        onChangeTrigger={ onChangeTrigger }
      ></Inputer>
      <Calendar
        toggleStatus={ toggleStatus }
        getSelectedDate={ getSelectedDate }
        updatedCalender={ updatedCalender }
      ></Calendar>
    </Fragment>
  );
};