import React from 'react';

import {
  useRouteError
} from "react-router-dom";

export default function ErrorPage() {

  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>¿¡Pero qué me estás contando!?</h1>
      <div>{error.message}</div>
    </div>
  );
}