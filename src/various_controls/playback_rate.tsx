import React from 'react'
import { forwardRef } from 'react';

import SpeedIcon from '@mui/icons-material/Speed';
import clsx from 'clsx';
import css from './various_controls.module.scss'

const values = [1.0, 0.85, 0.7];

const PlaybackRateDropdown = forwardRef((props, ref) => {
  const ul = React.useRef(null);
  const button = React.useRef(null);
  const opened = React.useRef(null);

  let playbackRate = ref.current ? ref.current.playbackRate : 1;

  React.useEffect(() => {
    playbackRate = ref.current ? ref.current.playbackRate : 1;
  }, [playbackRate]);

  const toggleFunc = (index) => {
    let i = index;
    ul.current.childNodes[i].style.display = '';
    ul.current.childNodes[++i % 3].style.display = 'none';
    ul.current.childNodes[++i % 3].style.display = 'none';
  }
  const openMenu = () => {
    opened.current = true;
    ul.current.childNodes[0].style.display = '';
    ul.current.childNodes[1].style.display = '';
    ul.current.childNodes[2].style.display = '';
  }
  const onClick = (e, value, index) => {
    e.stopPropagation();
    if (opened.current) {
      if (ref.current) {
        ref.current.playbackRate = value;
      }
      opened.current = false;
      toggleFunc(index)
      return;
    }
    openMenu();
  };

  return (
    <button onClick={openMenu} className={clsx(css.changeSpeed, css.sm)} ref={button}>
      <span>
        <span className={css.changeSpeedcontainer}>
          <ul ref={ul}>
            {values.map((value, index) => {
              return (<li
                style={value == playbackRate ? {} : { display: 'none' }}
                onClick={(e) => onClick(e, value, index)}
                data-value={value}
                key={index}
              >{value}</li>)
            })}
          </ul>
        </span>
        <SpeedIcon>Playback Speed</SpeedIcon>
      </span>
    </button>
  )
});

export default PlaybackRateDropdown;