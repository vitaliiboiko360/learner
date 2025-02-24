import React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import {
  selectActiveIndex,
  setActiveIndexAction,
} from '../store/activeIndexSlice.ts';
// import StartEndTime_ValidateAndDisplay from './start_end_time/start_end_time_validate_and_display.tsx';
import ConditionalLineBreak from './conditional_line_break.tsx';
import css from './text_page.module.scss';

import {
  setupAnimation2,
  cleanupSvgChildren2,
} from './anime/line_animation.ts';

const TextAnimeLine = React.forwardRef((props, timePointsRef) => {
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);

  const spanRef = React.useRef(null);

  let totalDurationOfAnimation = end - start;

  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectActiveIndex);

  function onClick() {
    dispatch(setActiveIndexAction(props.index));
    if (props.index == selector) {
      cleanupSvgChildren2(spanRef);
    }
    setupAnimation2(props.text.length, totalDurationOfAnimation, spanRef);
    props.onClick(start, end);
  }

  React.useEffect(() => {
    if (selector == props.index) {
      return;
    }
    cleanupSvgChildren2(spanRef);
  });

  const wordsArray = props.text.split(' ');
  let wordsInSpans = wordsArray.map((word, index) => {
    let leadingSpace = index > 0 ? ' ' : '';
    let endingSpace = index == wordsArray.length - 1 ? ' ' : '';
    return (
      <>
        <span
          key={`sentence-${index + wordsArray.length}`}
          className={css.wordStack}
        >
          <span key={`span-sentence-${index + wordsArray.length * 2}`}>
            {leadingSpace + word + endingSpace}
          </span>
          <svg
            key={`span-svg-${index + wordsArray.length * 3}`}
            height="2px"
            width="0"
          ></svg>
        </span>
      </>
    );
  });
  return (
    <>
      <div key={`outer-div-${props.index}`} style={{ display: 'inline' }}>
        {/* <StartEndTime_ValidateAndDisplay
        index={props.index}
        ref={timePointsRef}
        start={props.start}
        end={props.end}
        totalTime={props.totalTime}
        updateStart={setStart}
        updateEnd={setEnd}
        key={props.index}
      > */}
        <span
          key={`outer-sentence-span-${props.index}`}
          /*style={{ position: 'relative' }}*/ ref={spanRef}
          onClick={onClick}
        >
          {wordsInSpans}
        </span>
        {/* </StartEndTime_ValidateAndDisplay> */}
        <ConditionalLineBreak endParagraph={props.endParagraph} />
      </div>
    </>
  );
});

export default TextAnimeLine;
