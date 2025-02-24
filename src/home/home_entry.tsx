import React from 'react';

import css from './home.module.scss';
import { makeUrlToArtwork, makeUrlToResource } from '../etc/util.ts'
import { Link } from 'react-router-dom';

export default function HomeEntry({ element, height }) {
  const href = makeUrlToResource(element.resource);
  const { title, artwork } = element;

  return (<div style={{height}} className={css.item}>
    <Link to={href} className={css.link}>
      <h6 className={css.title}>{title}</h6>
      <span className={css.image}>
        <img src={makeUrlToArtwork(artwork)} />
      </span>
    </Link>
  </div>);
}