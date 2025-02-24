import React from 'react';

import ClickLines from './click_lines.tsx';

import {
  useLoaderData,
} from "react-router-dom";

const TextLines = React.forwardRef((props, refArrayAudioTimeTextSync) => {
  const data = useLoaderData();

  return (
    <ClickLines
      totalTime={props.totalTime}
      onClick={props.onClick}
      lines={data.lines}
      ref={refArrayAudioTimeTextSync}
    />);
});

export default TextLines;