import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from "react";
import css from './home.module.scss';
import HomeEntry from './home_entry';

const HomeArticles = ({ data }) => {
  const array = useMemo(() => {
    return data.texts;
  }, [data]);
  const row = useRef();
  const [height, setHeight] = useState('');
  useEffect(() => {
    const func = () => {
      if (row.current) {
        const children = row.current.children;
        if (children?.length) {
          const { width } = children[0]?.getBoundingClientRect();
          setHeight(width + 'px')
        }
      }
    }
    func();
    window.addEventListener('resize', func);
    return () => {
      window.removeEventListener('resize', func);
    }
  }, [])
  return <div ref={row} className={css.row}>
    {
      array.map((element, index) => {
        return <HomeEntry
          num={index}
          height={height}
          element={element}
          key={`item_${index}`} />
      })
    }
  </div>
};
export default HomeArticles;