import React from 'react';

import { useQuery } from 'react-query';
import HomeEntry from './home_entry';

import { makeUrlToResource } from '../etc/util.ts';
import css from './home.module.scss';
import HomeArticles from './home_articles.tsx';

export default function Home() {
  //var host = document.location.host;
  const { isLoading, error, data } = useQuery('homeData', () =>
    fetch(`data/list_of_texts.json`).then((res) => res.json())
  );
  if (isLoading) return 'Loading...';
  if (error) return 'Error getting list of texts: ' + error.message;

  return (
    <div className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Spanish Learner</h1>
      </div>
      <div className={css.content}>
        <div className={css.container}>
          <div className={css.list}>
            <HomeArticles data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
