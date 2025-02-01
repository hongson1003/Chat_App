import { AuthContainer } from '@/modules/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth-page.scss';

const AuthPage = () => {
  const navigate = useNavigate();

  const appState = useSelector((state) => state.appReducer);

  // useEffect(() => {
  //   if (appState?.isLogin === appConstants.STATE.RESOLVE) {
  //     navigate('/');
  //   }
  // }, [appState]);

  return (
    <div className="auth-container">
      <AuthContainer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
