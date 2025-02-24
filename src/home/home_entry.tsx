import React from 'react';

import css from './home.module.scss';
import { makeUrlToArtwork, makeUrlToResource } from '../etc/util.ts';
import { Link } from 'react-router-dom';

export default function HomeEntry({ element, height }) {
  const href = makeUrlToResource(element.resource);
  const { title, artwork } = element;

  const angles = [
    css.angle1,
    css.angle2,
    css.angle3,
    css.angle4,
    css.angle5,
    css.angle6,
    css.angle7,
    css.angle8,
  ];

  return (
    <div style={{ height }} className={css.item}>
      <Link to={href} className={[css.link].join(' ')}>
        <div
          className={[
            angles[Math.floor(Math.random() * angles.length)],
            css.glowingDiv,
          ].join(' ')}
        >
          <h6 className={css.title}>{title}</h6>
          <span className={css.image}>
            <img src={makeUrlToArtwork(artwork)} />
          </span>
        </div>
      </Link>
    </div>
  );
}
