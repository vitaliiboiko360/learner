import React from 'react';

import css from './audio.module.scss';

const AudioAndSlider = React.forwardRef((props, audioRef) => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  const lineRef = React.useRef();

  React.useEffect(() => {
    lineRef.current.style.color = document.body.style.background;
  });

  return (
    <>
      <div className={css.bottomLineOuterDiv}>
        <span ref={lineRef} className={css.bottomLine}>
          <span></span>
        </span>
      </div>
    </>
  );
});

export default AudioAndSlider;
