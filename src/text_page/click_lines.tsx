import React from 'react';
import { Provider } from 'react-redux'

import TextParagraph from './text_paragraph.tsx'
import TextAnimeLine from './text_anime_line.tsx'
import store from '../store/store.ts';
import css from './text_page.module.scss';

const ClickLines = React.forwardRef((props, refArrayAudioTimeTextSync) => {
  let lineArray = props.lines;

  let timePoints = lineArray.map((textEntry) => {
    return { start: textEntry.start, end: textEntry.end }
  });

  React.useEffect(() => {
    if (!refArrayAudioTimeTextSync.current)
      refArrayAudioTimeTextSync.current = timePoints;
  }, []);

  const getValue = (index, propsValue, isStart: boolean) => {
    if (refArrayAudioTimeTextSync.current)
      return isStart
        ? refArrayAudioTimeTextSync.current.at(index).start
        : refArrayAudioTimeTextSync.current.at(index).end;
    return propsValue;
  }

  let textLines = lineArray.map((textEntry, index) => {
    return (<React.Fragment key={index}>
      <TextAnimeLine
        onClick={props.onClick}
        text={textEntry.text}
        index={index}
        endParagraph={textEntry.endParagraph}
        start={getValue(props.index, textEntry.start, true)}
        end={getValue(props.index, textEntry.end, false)}
        totalTime={props.totalTime}
        ref={refArrayAudioTimeTextSync}
      />
    </React.Fragment>);
  });

  return (<>
    <Provider store={store}>
      <div className={css.textPage}>
        <div className={css.center}>
          <h2 className={css.title}>
            {textLines[0]}
          </h2>
        </div>
        <div>{textLines.slice(1)}</div>
      </div>
    </Provider>
  </>);
});

export default ClickLines;