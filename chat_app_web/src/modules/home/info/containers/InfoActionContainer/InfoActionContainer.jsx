import { appRoutes } from '@/constants';
import { appActions } from '@/redux';
import { authService } from '@/services';
import { Button, Divider } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InfoModal } from '../../modals';
import './info-action-container.scss';

const InfoActionContainer = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleOnCloseInfoModal = () => {
    setOpen(false);
  };

  const handleOnOpenInfoModal = () => {
    setOpen(true);
  };

  const handleLogout = async () => {
    dispatch(appActions.logoutStart());
    setLoading(true);
    try {
      await authService.logout();
      dispatch(appActions.logoutSuccess());
      navigate(appRoutes.LOGIN);
    } catch (error) {
      console.log('🚀 ~ handleLogout ~ error:', error);
      dispatch(appActions.logoutFailure());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="info-action-container">
        <Button block onClick={handleOnOpenInfoModal}>
          Hồ sơ của bạn
        </Button>
        <Button block>Cài đặt</Button>

        <Divider
          style={{
            margin: '2px 0',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          }}
        />

        <Button block onClick={handleLogout} loading={loading}>
          Đăng xuất
        </Button>
      </div>

      <InfoModal data={data} open={open} onClose={handleOnCloseInfoModal} />
    </>
  );
};

export default InfoActionContainer;
