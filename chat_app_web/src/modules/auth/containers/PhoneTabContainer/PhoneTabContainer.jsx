import { appActions } from '@/redux';
import { authService } from '@/services';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../../components';
import { PhoneFooterContainer } from '../PhoneFooterContainer';

const PhoneTabContainer = () => {
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleOnLogin = async ({ username, password }) => {
    dispatch(appActions.loginStart());
    try {
      const res = await authService.login(username, password);
      dispatch(appActions.loginSuccess(res));
    } catch (error) {
      console.log('🚀 ~ handleOnLogin ~ error:', error);
      dispatch(appActions.loginFailure(error));
    }
  };

  return (
    <>
      <LoginForm onLogin={handleOnLogin} />
      <PhoneFooterContainer />
    </>
  );
};

export default PhoneTabContainer;
