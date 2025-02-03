import { appActions } from '@/redux';
import { authService } from '@/services';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../../components';
import { PhoneFooterContainer } from '../PhoneFooterContainer';
import { useNavigate } from 'react-router-dom';
import { setAuthorizationAxios } from '@/configs';
import { appRoutes } from '@/constants';

const PhoneTabContainer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnLogin = async ({ username, password }) => {
    dispatch(appActions.loginStart());
    setLoading(true);
    try {
      const res = await authService.login(username, password);
      dispatch(appActions.loginSuccess(res));
      setAuthorizationAxios(res.accessToken);
      navigate(appRoutes.HOME);
    } catch (error) {
      console.log('🚀 ~ handleOnLogin ~ error:', error);
      dispatch(appActions.loginFailure(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginForm onLogin={handleOnLogin} loading={loading} />
      <PhoneFooterContainer />
    </>
  );
};

export default PhoneTabContainer;
