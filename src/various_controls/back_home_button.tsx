import React from 'react';
import { Link } from 'react-router-dom';

import FirstPageOutlined from '@mui/icons-material/FirstPageOutlined';
import clsx from 'clsx';
import css from './various_controls.module.scss'

export default function BackHomeButton() {
  return (
    <Link className={clsx(css.backHome, css.sm)} to="/">
      <span>
        <FirstPageOutlined />
        <span>Back Home</span>
      </span>
    </Link>
  );
}