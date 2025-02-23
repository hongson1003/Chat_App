import { SpinnerLoading } from '@/components/common';
import { appConstants, appRoutes } from '@/constants';
import { appActions } from '@/redux';
import { authService } from '@/services';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './app-layout.scss';

const AppLayout = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [loading, setLoading] = React.useState(true);

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

  useEffect(() => {
    if (appState.state !== appConstants.STATE.PENDING) {
      setLoading(false);
    }
  }, [appState.state]);

  if (
    loading ||
    (appState.isLogin && pathname === appRoutes.LOGIN) ||
    (!appState.isLogin && pathname === appRoutes.HOME)
  )
    return (
      <div className="spinner-loading-container">
        <SpinnerLoading />
        <Typography.Text>Loading...</Typography.Text>
      </div>
    );

  return (
    <>
      <Outlet />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
};

export default AppLayout;
