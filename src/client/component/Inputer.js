// library
import React, { useState, useEffect } from 'react';

// scss
import inputStyle from '../scss/inputer.scss';

export const Inputer = (props) => {
  const defaultProps = {
    'input': '',
    'isInValidDate': false
  }
  const regexp = {
    'input': /^([1-9][\d]{3}([\-][\d]{2}){2})$/
  }
  const [ localUpdatedValue, localUpdatedValueDispatch ] = useState(defaultProps['input']);
  const [ newIsInValidDate, isInValidDateDispatch ] = useState(defaultProps['isInValidDate']);
  const {
    updatedValue ,
    onClickTrigger,
    onChangeTrigger
  } = props;

  const onClickTriggerHandler = e => {
    localUpdatedValueDispatch(defaultProps['input']);
    onClickTrigger(e);
    isInValidDateDispatch(false);
  }

  const onChangeTriggerHanlder = e => {
    const newValue = e.target.value;

    isInValidDateDispatch(false);
    localUpdatedValueDispatch(newValue);
    if(!regexp['input'].test(newValue)){
      isInValidDateDispatch(true);
      return
    }

    onChangeTrigger(newValue);
  }

  useEffect(() => {
    localUpdatedValueDispatch(updatedValue);
  }, [updatedValue]);

  return (
    <label className={ inputStyle['labeler'] }>
      <input
        type="text"
        placeholder="e.g. 2021-09-01"
        className={ `${inputStyle['inputer']} ${newIsInValidDate ? inputStyle['error'] : ''}`}
        value={ localUpdatedValue }
        onClick={e => { onClickTriggerHandler(e) }}
        onChange={e => { onChangeTriggerHanlder(e) }}
      >
      </input>
    </label>
  );
};