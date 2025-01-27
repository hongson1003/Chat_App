import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../components/login/login';
import './authPage.scss';

const AuthPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.appReducer);
  useEffect(() => {
    if (state?.isLogin === appTypes.STATE.RESOLVE) {
      navigate('/');
    }
  }, [state]);

  return (
    <>
      <div className="login-container">
        <h1 className="title">Zalo</h1>
        <h2>
          Đăng nhập tài khoản Zalo
          <br />
          để kết nối với ứng dụng Zalo Web
        </h2>
        <Login />

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
      <div className="svg-login"></div>
    </>
  );
};

export default AuthPage;
