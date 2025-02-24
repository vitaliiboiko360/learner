import React, { isValidElement } from 'react';
import css from './various_controls.module.scss';
import { useParams } from 'react-router-dom';

const ButtonSubmit_AudioTextSyncTime = React.forwardRef(
  (props, refArrayAudioTimeTextSync) => {
    const [isDisabled, setIsDisabled] = React.useState(true);
    const { resource } = useParams();
    let ref = React.useRef(null);
    let setOfInvalidIndices = new Set<number>();

    const onClick = () => {
      let data = {
        resource: resource,
        data: 'empty',
      };

      if (refArrayAudioTimeTextSync.current) {
        data = {
          resource: resource,
          data: refArrayAudioTimeTextSync.current,
        };
      }

      let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      };
      fetch('', options);
      setIsDisabled(true);
    };

    React.useEffect(() => {
      const eventHandler = (e) => {
        e.stopPropagation();
        // e.detail {index: number, isValid: boolean, isStart: boolean}
        const { index, isValid, isStart } = e.detail;
        const key = index * 2 + isStart ? 0 : 1;
        if (isValid) setOfInvalidIndices.delete(key);
        else setOfInvalidIndices.add(key);

        setIsDisabled(setOfInvalidIndices.size > 0);
        //console.log(e.detail);
      };

      window.addEventListener('UpdateTimeArray', eventHandler);
      // console.log(`eventListener is added`);
      return () => {
        window.removeEventListener('UpdateTimeArray', eventHandler);
      };
    }, []);

    return (
      <button
        disabled={isDisabled}
        ref={ref}
        onClick={onClick}
        className={css.buttonSubmitTimeSyncToServer}
      >
        Submit Audio-Text Sync
      </button>
    );
  }
);

export default ButtonSubmit_AudioTextSyncTime;
