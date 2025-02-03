import { HomeSidebar } from '@/components/layout/home';
import { axios } from '@/configs';
import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home-layout.scss';
const { Content, Sider } = Layout;

const HomeLayout = () => {
  const updateOnline = async (time) => {
    try {
      await axios.put('/users/updateOnline', { time });
    } catch (error) {
      console.log(error);
      toast.error('Error when update online status');
    }
  };

  // check authentication
  // useEffect(() => {
  //   navigate(appRoutes.LOGIN);
  // }, []);

  // useEffect(() => {
  //   if (state?.userInfo) {
  //     socket.then((socket) => {
  //       socket.emit('setup', state?.userInfo?.user);
  //       socket.on('connected', () => {
  //         if (state?.isConnectedSocket === false) {
  //           socket.emit('join-room', state?.userInfo?.user.id);
  //           dispatch(appActions.connectSocketSuccess());
  //         }
  //       });
  //     });
  //   }
  // }, [state.userInfo]);

  // useEffect(() => {
  //   const triggerOnline = async () => {
  //     await updateOnline(null);
  //     socket.then((socket) => {
  //       socket.emit('online', state?.userInfo?.user.id);
  //     });
  //   };
  //   const triggerOffline = async () => {
  //     socket.then((socket) => {
  //       window.addEventListener('beforeunload', async (e) => {
  //         socket.emit('offline', state?.userInfo?.user.id);
  //       });
  //     });
  //   };

  //   if (state?.isConnectedSocket === true) {
  //     triggerOnline();
  //     triggerOffline();
  //   }
  // }, [state?.isConnectedSocket]);

  // useEffect(() => {
  //   if (state?.isConnectedSocket === true) {
  //     socket.then((socket) => {
  //       socket.on('open-call', (data) => {
  //         if (state?.userInfo?.user?.peerId === data.peerId) {
  //           return;
  //         }
  //         // Kết nối peerjs
  //         const width = 1000; // Độ rộng của cửa sổ mới
  //         const height = 500; // Độ cao của cửa sổ mới
  //         const left = (window.screen.width - width) / 2; // Tính toán vị trí trung tâm theo trục X
  //         const top = (window.screen.height - height) / 2; // Tính toán vị trí trung tâm theo trục Y
  //         const newWindow = window.open(
  //           `/video-call?chat=${data.room}&isCalled=true`,
  //           '_blank',
  //           `width=${width},height=${height},left=${left},top=${top}`
  //         );
  //         if (newWindow) {
  //           // Thực hiện các hành động cần thiết khi cửa sổ mới được mở
  //         } else {
  //           alert('Popup blocked! Please enable popups for this site.');
  //         }
  //       });
  //     });
  //   }
  // }, [state?.isConnectedSocket]);

  return (
    <>
      <Layout className="home-layout-container">
        {/* {!pathName.includes('/chat') && (
          <Sider width={'calc(30px+2vw)'}>
            <HomeSidebar />
          </Sider>
        )} */}
        <Sider width={'calc(30px+2vw)'}>
          <HomeSidebar />
        </Sider>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
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
      </Layout>
    </>
  );
};

export default HomeLayout;
