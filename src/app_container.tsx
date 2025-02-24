import React from 'react';

import AudioTextLines from './audio/audio_textlines.tsx';
import Home from './home/home.tsx';
import ErrorPage from './error/error.tsx';
import SvgPage from './svg_page/svg_page.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Home />,
    path: '/',

    loader: async ({ request, params }) => {
      return null;
    },

    action: async ({ request }) => {
      return null;
    },
  },
  {
    path: ':resource',
    element: <AudioTextLines />,
    loader: async ({ request, params }) => {
      let { resource } = params;
      // console.log(resource);
      // console.log('calling fetch from loader');
      try {
        const data = await queryClient.fetchQuery([resource], async () => {
          const response = await fetch(`/data/${resource}.json`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        });

        const audio = await queryClient.fetchQuery([data.audio], async () => {
          const src = `data/${data.audio}`;
          const blob = await fetch(src).then((resp) => resp.blob());
        });

        return data;
      } catch (error) {
        throw Error(`Error ${error}`);
      }
    },
    errorElement: <ErrorPage />,
  },
  {
    path: '/svg',
    element: <SvgPage />,
    loader: async ({ request, params }) => {
      let resource = 'me_gusta_leer';
      try {
        const data = await queryClient.fetchQuery([resource], async () => {
          const response = await fetch(`/data/${resource}.json`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        });
        return data;
      } catch (error) {
        throw Error(`Error ${error}`);
      }
    },
  },
]);

function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppContainer;
