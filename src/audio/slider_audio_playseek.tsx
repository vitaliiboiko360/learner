import React from 'react';

import Slider from '@mui/material/Slider';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import css from './audio.module.scss';

const SliderAudioPlayseek = React.forwardRef((props, ref) => {

  const theme = useTheme();

  const TinyText = styled(Typography)({
    fontSize: '1.5 rem',
    opacity: 0.7,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  return (
    <>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={props.currentTime}
        min={0}
        step={0.1}
        max={props.totalTime}
        valueLabelDisplay='auto'
        onChange={(_, value) => { }/*ref.current.currentTime = value*/}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                ? 'rgb(255 255 255 / 16%)'
                : 'rgb(0 0 0 / 16%)'
                } `,
            },
            '&.Mui-active': {
              width: 20,
              height: 20,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <div className={css.nums}>
        <TinyText>{props.currentTime}</TinyText>
        <TinyText>{props.totalTime}</TinyText>
      </div>
    </>);
});

export default SliderAudioPlayseek;