import { appRoutes } from '@/constants';
import {
  AuthPage,
  ErrorPage,
  NotFoundPage,
  ResetPasswordPage,
  VerifyPage,
} from '@/pages';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/home/homeLayout';
import OutsideLayout from '../layouts/outside/outsideLayout';
import HomeSubLayout from '../layouts/sub/homeSubLayout';
import JoinGroup from '../pages/utils/joinGroup';

const routes = [
  {
    path: appRoutes.ROOT,
    element: <HomeLayout />,
    exact: true,
    children: [
      {
        path: appRoutes.HOME,
        element: <HomeSubLayout />,
      },
      {
        path: 'chat/:id',
        element: <JoinGroup />,
      },
    ],
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
];

export const router = createBrowserRouter(routes);
