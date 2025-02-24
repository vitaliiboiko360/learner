import React from 'react'
import clsx from 'clsx';
import css from '../text_page.module.scss';

const getClassName = function (props) {
  const localClassName =
    (props.value == 0 && props.force != true) ?
      css.unassigned :
      (props.valid ? css[props.classNameKey] : css.invalid);
  return clsx(css.sub, localClassName);
}

const StartEndTime_Sub = function (props) {
  const className = getClassName(props);
  return (
    <sub
      className={className}
      onClick={props.onClick}
    >{props.value}</sub>
  );
};

const StartEndTime_Input = function (props) {
  const className = getClassName(props);
  const [value, setValue] = React.useState(props.value);
  return (
    <input
      className={className}
      type='number'
      inputMode='decimal'
      autoFocus
      min={0}
      max={props.totalTime}
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      step={0.01}
      onBlur={(e) => {
        props.updateValue(value);
      }}
      onKeyDown={(event) => {
        if (event.key === ',') {
        }
        if (event.key === 'Enter') {
          props.updateValue(value);
        }
      }}
      pattern='[0-9]{1,3}[\.,][0-9]{1,2}'
      required
    ></input >
  );
}

export default function StartEndTime_SubEditableField(props) {
  const [activeEditMode, setActiveEditMode] = React.useState(false);
  return (
    activeEditMode ?
      <StartEndTime_Input
        force={props.force}
        classNameKey={props.classNameKey}
        totalTime={props.totalTime}
        value={props.value}
        valid={props.valid}
        updateValue={(value) => {
          props.updateValue(value);
          setActiveEditMode(false);
        }}
      /> :
      <StartEndTime_Sub
        force={props.force}
        classNameKey={props.classNameKey}
        value={props.value}
        valid={props.valid}
        onClick={() => {
          setActiveEditMode(true);
        }}
      />
  );
}