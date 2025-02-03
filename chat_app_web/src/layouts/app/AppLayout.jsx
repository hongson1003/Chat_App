import { SpinnerLoading } from '@/components/common';
import { appConstants, appRoutes } from '@/constants';
import { appActions } from '@/redux';
import { authService } from '@/services';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import './app-layout.scss';

const AppLayout = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const navigate = useNavigate();

  const handleCheckAuth = async () => {
    dispatch(appActions.loginStart());
    try {
      const res = await authService.checkAuth();
      dispatch(appActions.loginSuccess(res));
    } catch (error) {
      console.log('🚀 ~ handleCheckAuth ~ error:', error);
      dispatch(appActions.loginFailure());
    }
  };

  useEffect(() => {
    handleCheckAuth();
  }, []);

  useEffect(() => {
    if (appState.state !== appConstants.STATE.PENDING) {
      if (appState.isLogin) navigate(appRoutes.HOME);
      else navigate(appRoutes.LOGIN);
    }
  }, [appState.state]);

  if (appState.state === appConstants.STATE.PENDING)
    return (
      <div className="spinner-loading-container">
        <SpinnerLoading />
        <Typography.Text>Loading...</Typography.Text>
      </div>
    );

  return <Outlet />;
};

export default AppLayout;
