import React from 'react'

import StartEndTime_SubEditableField from './start_end_time_sub_input.tsx'

const StartEndTime_ValidateAndDisplay = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState({ value: props.start, valid: true });
  const [end, setEnd] = React.useState({ value: props.end, valid: true });

  function collectValueForValidation(value, index, isStart: boolean) {
    if (!timePointsRef.current)
      return;

    let oldValue = 0;
    if (isStart) {
      oldValue = timePointsRef.current[index].start;
      timePointsRef.current[index].start = value;
    } else {
      oldValue = timePointsRef.current[index].end;
      timePointsRef.current[index].end = value;
    }

    if (oldValue == value) {
      return;
    }
  }

  function isValidValue(value, index, isStart: boolean) {
    if (!timePointsRef.current)
      return;

    // we check three conditions:
    /* 1) must not overflow totalTime */
    let isValid_0
      = props.totalTime > 0 ? value < props.totalTime : true;
    /* 2) must be correct with current index */
    let isValid_1
      = true;
    /* 3) must be correct with adjacent index */
    let isValid_2
      = true;

    if (isStart) {
      const nextEnd = timePointsRef.current[index].end;
      isValid_1 =
        nextEnd == 0 ||
        value < nextEnd;

      if (index > 0) {
        const previousEnd = timePointsRef.current[index - 1].end;
        isValid_2 =
          previousEnd == 0 ||
          value >= previousEnd;
      }
    } else {
      const previousStart = timePointsRef.current[index].start;
      isValid_1 =
        previousStart == 0 ||
        value > previousStart;

      if ((index + 1) < timePointsRef.current.length) {
        const nextStart = timePointsRef.current[index + 1].start;
        isValid_2 =
          nextStart == 0 ||
          value <= nextStart;
        //console.log(`value ${value} <= nextStart ${nextStart}`);
      }
    }
    // console.log(`isValid_0 ${isValid_0}\t isValid_1 ${isValid_1}\t isValid_2  ${isValid_2}`);
    return isValid_0 && isValid_1 && isValid_2;
  }

  function sendEvent(index, isValid, isStart) {
    const event = new CustomEvent("UpdateTimeArray", {
      detail: {
        index: index,
        isValid: isValid,
        isStart: isStart
      }
    });
    console.log(`dispatchEvent`);
    window.dispatchEvent(event);
  }

  function getValueAndValidObj(val, index, isStart: boolean) {
    const value = parseFloat(val);
    collectValueForValidation(value, index, isStart);
    const isValid = isValidValue(value, index, isStart);
    sendEvent(index, isValid, isStart);
    return { value: value, valid: isValid };
  }

  return (<>
    <StartEndTime_SubEditableField
      force={props.index == 0 ? true : false}
      classNameKey={'start'}
      value={start.value}
      valid={start.valid}
      updateValue={(value) => {
        const valueValidObj = getValueAndValidObj(value, props.index, true);
        setStart({ value: valueValidObj.value, valid: valueValidObj.valid });
        props.updateStart(valueValidObj.value);
      }}
    />
    {
      props.children
    }
    <StartEndTime_SubEditableField
      classNameKey={'end'}
      value={end.value}
      valid={end.valid}
      updateValue={(value) => {
        const valueValidObj = getValueAndValidObj(value, props.index, false);
        setEnd({ value: valueValidObj.value, valid: valueValidObj.valid });
        props.updateEnd(valueValidObj.value);
      }}
    />
  </>);
});

export default StartEndTime_ValidateAndDisplay;