import React from 'react';

import TextLines from '../text_page/text_lines.tsx';
import AudioAndSlider from './audio_and_silider.tsx';
import BackHomeButton from '../various_controls/back_home_button.tsx';
// import ButtonSubmit_AudioTextSyncTime from '../various_controls/button_submit_audio_text_sync_time.tsx'

import { useLoaderData } from 'react-router-dom';
import PlaybackRateDropdown from '../various_controls/playback_rate.tsx';
import css from './audio.module.scss';

export default function AudioTextLines() {
  const audioRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const onTimeUpdateHandler = React.useRef(null);
  const refArrayAudioTimeTextSync = React.useRef(null);
  const [totalTime, setTotalTime] = React.useState(0);

  const updateStopTimeAudio = function (endTime) {
    if (onTimeUpdateHandler.current) {
      audioRef.current.removeEventListener(
        'timeupdate',
        onTimeUpdateHandler.current,
        false
      );
    }

    const onTimeUpdateHandlerNew = () => {
      if (audioRef.current.currentTime >= parseFloat(endTime)) {
        audioRef.current.pause();
        audioRef.current.removeEventListener(
          'timeupdate',
          onTimeUpdateHandler.current,
          false
        );
      }
    };

    audioRef.current.addEventListener(
      'timeupdate',
      onTimeUpdateHandlerNew,
      false
    );
    onTimeUpdateHandler.current = onTimeUpdateHandlerNew;
  };

  const onClickUserPlayNewStart = function (seconds, end) {
    audioRef.current.currentTime = seconds;
    updateStopTimeAudio(end);
    audioRef.current.play();
  };

  const data = useLoaderData();

  function getGradient() {
    const getRandColorHash = () => {
      return `#${Array(3)
        .fill(0)
        .map(() => {
          return Math.floor(Math.random() * 255)
            .toString(16)
            .padStart(2, '0');
        })
        .join('')}`;
    };
    let color1 = getRandColorHash();
    let color2 = getRandColorHash();

    let angle = Math.floor(Math.round(Math.random() * 360));
    let gradient = `linear-gradient(${angle}deg, ${color1}40, ${color2}40)`;
    return gradient;
  }

  React.useEffect(() => {
    if (document.body.style.background == '')
      document.body.style.background = getGradient();
    return () => {
      if (document.body.style.background != '')
        document.body.style.background = '';
    };
  });

  React.useEffect(() => {
    if (audioRef.current) return;
    (async () => {
      const src = `data/${data.audio}`;
      const blob = await fetch(src).then((resp) => resp.blob());
      const audio = new Audio(URL.createObjectURL(blob));
      audioRef.current = audio;

      if (containerRef.current) {
        containerRef.current.append(audio);
      }

      audioRef.current.addEventListener('loadedmetadata', (event) =>
        setTotalTime(audioRef.current.duration)
      );
    })();
  });

  return (
    <div ref={containerRef} className={css.container}>
      <div className={css.controlTopPanel}>
        <div>
          <BackHomeButton />
        </div>
        {/* <ButtonSubmit_AudioTextSyncTime
          ref={refArrayAudioTimeTextSync} /> */}
        <div>
          <PlaybackRateDropdown ref={audioRef} />
        </div>
      </div>
      <div className={css.page}>
        <div className={css.content}>
          <TextLines
            onClick={onClickUserPlayNewStart}
            totalTime={totalTime}
            ref={refArrayAudioTimeTextSync}
          />
        </div>
      </div>
      <AudioAndSlider updateTotalTime={setTotalTime} />
    </div>
  );
}
