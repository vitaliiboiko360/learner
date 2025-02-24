import React from 'react';
import { forwardRef } from 'react';

const Audio = forwardRef((props, ref) => {
  React.useEffect(() => {
    const onStalled = () => { ref.current.load() };
    if (ref.current) {
      ref.current.addEventListener('stalled', onStalled);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('stalled', onStalled);
      }
    }
  }, []);
  const src = `data/${props.audio}`;
  return (<audio ref={ref} src={src} type="audio/mpeg" ></audio>);
});


export default Audio;