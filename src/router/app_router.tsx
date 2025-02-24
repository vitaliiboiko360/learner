import React from 'react';

import AudioTextLines from './audio_textlines.tsx';
import Home from './home.tsx';

import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Home />,
    path: '/',

    loader: async ({ request, params }) => {
      return null;
      // return fetch(
      //   `/fake/api/teams/${params.teamId}.json`,
      //   { signal: request.signal }
      // );
    },

    // performing this mutation when data is submitted to it
    action: async ({ request }) => {
      return null;
      // return updateFakeTeam(await request.formData());
    },

    // and renders this element in case something went wrong
    //errorElement: <ErrorBoundary />,
  },
  {
    path: ':resource',
    element: <AudioTextLines />,
    loader: async ({ request, params }) => {
      let { resource } = useParams();
      // console.log(resource);
      //queryClient.fetchQuery();
      //console.log(params)
      return null;
      // return fetch(
      //   `/fake/api/teams/${params.teamId}.json`,
      //   { signal: request.signal }
      // );
    },
  },
]);

function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppRouter;
