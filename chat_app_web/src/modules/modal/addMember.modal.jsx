import { axios, socket } from '@/configs';
import { appConstants } from '@/constants';
import { appActions } from '@/redux';
import { Button, Checkbox, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatHandler, userHandler } from '@/utils';
import AvatarUser from '../user/components/AvatarUser/AvatarUser';
import './addMember.modal.scss';
const CheckboxGroup = Checkbox.Group;

const AddMemberModal = ({ children, chat }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.appReducer?.userInfo?.user);
  const stateUser = useSelector((state) => state.userReducer);
  const [disableMembers, setDisableMembers] = useState([]);

  const [checkedList, setCheckedList] = useState([]);
  const [plainOptions, setPlainOptions] = useState([]);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put('/chat/addMembers', {
        chatId: chat._id,
        members: checkedList.map((item) => JSON.parse(item).id),
      });
      const contentMessage = checkedList
        .map((item) => JSON.parse(item).userName)
        .join(', ');
      await chatHandler.sendNotifyToChatRealTime(
        chat._id,
        `${user?.userName} đã thêm ${contentMessage} vào nhóm.`,
        appConstants.MESSAGES.NOTIFY
      );
      if (res.errCode === 0) {
        dispatch(appActions.editGroup(res.data));
        socket.then((socket) => {
          socket.emit('add-member', res.data);
          stateUser.fetchChats();
        });
      }
      setIsLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add member:', error);
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchFriends = async () => {
    try {
      const res = await axios.get('/users/friends?page=1&limit=10');
      if (res.errCode === 0) {
        const data = res.data;
        const friends = [];
        data.forEach((item) => {
          friends.push(
            userHandler.getFriend(user, [item.sender, item.receiver])
          );
        });
        setPlainOptions(friends);
      }
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  const handleCheckMembersChat = async () => {
    const participants = chat?.participants;
    const members = [];
    participants.forEach((item) => {
      if (user.id !== item.id) {
        delete item.lastedOnline;
        members.push(JSON.stringify(item));
      }
    });
    setDisableMembers(members);
    setCheckedList(members);
  };

  const onChange = (list) => {
    setCheckedList(list);
  };

  useEffect(() => {
    fetchFriends();
    handleCheckMembersChat();
  }, [chat]);

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        title="Thêm thành viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={isLoading}
            disabled={disableMembers === checkedList}
          >
            Xác nhận
          </Button>,
        ]}
        destroyOnClose
      >
        <div className="add-member-modal">
          <header>
            <Input placeholder="Nhập tên tìm kiếm" />
          </header>
          <div className="list-main">
            {plainOptions && plainOptions.length > 0 && (
              <CheckboxGroup
                options={plainOptions.map((item) => {
                  delete item.lastedOnline;
                  return {
                    label: (
                      <div className="group-friend">
                        <AvatarUser
                          image={item?.avatar}
                          name={item?.userName}
                        />
                        <p>{item?.userName}</p>
                      </div>
                    ),
                    value: JSON.stringify(item),
                    disabled: disableMembers.includes(JSON.stringify(item)),
                  };
                })}
                value={checkedList}
                onChange={onChange}
                className="list-friend"
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddMemberModal;
