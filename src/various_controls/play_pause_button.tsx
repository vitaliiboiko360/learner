import React from 'react'
import { forwardRef } from 'react';

import IconButton from '@mui/material/IconButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

const PlayPauseButton = forwardRef((props, ref) => {

  const [pauseButton, setPauseButton] = React.useState(false);

  React.useEffect(() => {
    ref?.current.addEventListener("pause", () => setPauseButton(false), false);
    ref?.current.addEventListener("play", () => setPauseButton(true), false);
    return () => {
      if (!ref.current)
        return;
      ref?.current.removeEventListener("pause", () => setPauseButton(true), false);
      ref?.current.removeEventListener("play", () => setPauseButton(false), false);
    };
  }, []);

  return (
    <div style={{ float: 'left', clear: 'none' }}>
      <IconButton
        aria-label={pauseButton ? 'pause' : 'play'}
        sx={{ mx: 1 }}
        onClick={() => {
          setPauseButton((val) => !val);
          if (pauseButton) {
            ref.current.pause();
          } else {
            ref.current.play();
          }
        }
        }
      >
        {pauseButton ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
      </IconButton>
    </div >
  )
});

export default PlayPauseButton;