import { SpinnerLoading } from '@/components/common';
import { appConstants, appRoutes } from '@/constants';
import { appActions } from '@/redux';
import { authService } from '@/services';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './app-layout.scss';

const AppLayout = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleCheckAuth = async () => {
    dispatch(appActions.loginStart());
    try {
      const res = await authService.checkAuth();
      dispatch(appActions.loginSuccess(res));
      navigate(appRoutes.HOME);
    } catch (error) {
      console.log('🚀 ~ handleCheckAuth ~ error:', error);
      dispatch(appActions.loginFailure());
      navigate(appRoutes.LOGIN);
    }
  };

  useEffect(() => {
    handleCheckAuth();
  }, []);

  if (
    appState.state === appConstants.STATE.PENDING ||
    (appState.isLogin && pathname === appRoutes.LOGIN) ||
    (!appState.isLogin && pathname === appRoutes.HOME)
  )
    return (
      <div className="spinner-loading-container">
        <SpinnerLoading />
        <Typography.Text>Loading...</Typography.Text>
      </div>
    );

  return <Outlet />;
};

export default AppLayout;
