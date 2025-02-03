import { appRoutes } from '@/constants';
import { AppLayout, HomeLayout } from '@/layouts';
import {
  AuthPage,
  ErrorPage,
  NotFoundPage,
  ResetPasswordPage,
  VerifyPage,
} from '@/pages';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import OutsideLayout from '../layouts/Outside/OutsideLayout';
import HomeSubLayout from '../layouts/Sub/HomeSubLayout';
import JoinGroup from '../pages/utils/joinGroup';

const routes = [
  {
    path: appRoutes.ROOT,
    element: <AppLayout />,
    exact: true,
    children: [
      {
        path: appRoutes.HOME,
        element: <HomeLayout />,
        children: [
          {
            element: <HomeSubLayout />,
            exact: true,
          },
        ],
      },
      {
        path: 'chat/:id',
        element: <JoinGroup />,
      },
      {
        path: appRoutes.LOGIN,
        element: <AuthPage />,
      },
      {
        path: appRoutes.VERIFY,
        element: <VerifyPage />,
      },
      {
        path: appRoutes.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: '/*',
        element: <OutsideLayout />,
        children: [
          {
            path: appRoutes.ERROR,
            element: <ErrorPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
