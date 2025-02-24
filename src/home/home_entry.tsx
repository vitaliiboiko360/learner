import React from 'react';

import css from './home.module.scss';
import { makeUrlToArtwork, makeUrlToResource } from '../etc/util.ts';
import { Link } from 'react-router-dom';

export default function HomeEntry({ element, height }) {
  const href = makeUrlToResource(element.resource);
  const { title, artwork } = element;

  const gradients = [
    css.gradient1,
    css.gradient2,
    css.gradient3,
    css.gradient4,
  ];

  const getRandGradient = () => {
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const angles = [css.angle1, css.angle2, css.angle3, css.angle4];

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
