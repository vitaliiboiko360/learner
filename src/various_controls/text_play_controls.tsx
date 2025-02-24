import * as React from 'react';
const useEffect = React.useEffect;
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function TextPlayControls(props) {
    useEffect(() => {
        window.addEventListener('click', props.onClick, { passive: true });
        return () => window.removeEventListener('click', props.onClick);
    }, []);
    
    return (
        <PlayArrowIcon />
    );
}