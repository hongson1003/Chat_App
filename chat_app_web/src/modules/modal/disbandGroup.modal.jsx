import { axios, socket } from '@/configs';
import { appConstants } from '@/constants';
import { userActions } from '@/redux';
import { chatHandler } from '@/utils';
import { Button, Input, Modal, Popconfirm, Radio } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AvatarUser from '../user/components/AvatarUser/AvatarUser';
import './disbandGroup.modal.scss';

const DisbandGroupModal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chat = useSelector((state) => state.appReducer?.subNav);
  const user = useSelector((state) => state.appReducer?.userInfo?.user);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put('/chat/grantGroupLeader', {
        memberId: value.id,
        chatId: chat._id,
      });
      await chatHandler.sendNotifyToChatRealTime(
        chat._id,
        `${user?.userName} đã rời nhóm, ${value.userName} đã trở thành nhóm trưởng.`,
        appConstants.MESSAGES.NOTIFY
      );
      if (res.errCode === 0) {
        socket.then((socket) => {
          socket.emit('transfer-disband-group', res.data);
          dispatch(userActions.accessChat(null));
          stateUser.fetchChats();
        });
      }
      setIsLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to disband group:', error);
      setIsLoading(false);
      toast.error('Rời nhóm thất bại');
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const confirm = (e) => {
    handleOk();
  };
  const cancel = (e) => {
    handleCancel();
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        title="Chọn nhóm trưởng mới trước khi rời nhóm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Popconfirm
            description="Bạn có chắc chắn muốn rời nhóm?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Xác nhận"
            cancelText="Hủy"
            key="submit"
          >
            <Button danger type="primary" disabled={!value} loading={isLoading}>
              Rời nhóm
            </Button>
          </Popconfirm>,
        ]}
      >
        <hr />
        <div className="disband-content">
          <Input prefix={<i className="fa-solid fa-magnifying-glass"></i>} />
          <div className="disband-main">
            <Radio.Group
              onChange={onChange}
              value={value}
              className="group-radio"
            >
              {chat?.participants?.map((item) => {
                if (item.id === user.id) return null;
                return (
                  <Radio
                    value={item}
                    key={item.id}
                    checked={item.id === value.id}
                  >
                    <div className="group-radio-item">
                      <AvatarUser name={item?.userName} image={item?.avatar} />
                      <p>{item?.userName}</p>
                    </div>
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        <hr />
      </Modal>
    </>
  );
};

export default DisbandGroupModal;
