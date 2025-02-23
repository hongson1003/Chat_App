import { axios, socket } from '@/configs';
import { appConstants } from '@/constants';
import ChatPopover from '@/modules/popover/chat.popover';
import { ChatUser } from '@/modules/user';
import { appActions, userActions } from '@/redux';
import { timeHandler, userHandler } from '@/utils';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './chat-sidebar.scss';
import React from 'react';

const ChatSidebar = ({ current: currentSearch, statusChat, setStatusChat }) => {
  const [chats, setChats] = useState([]);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(appConstants.STATE.PENDING);
  const user = useSelector((state) => state.appReducer?.userInfo?.user);
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.appReducer?.subNav);
  const [isMouse, setIsMouse] = useState(null);
  const userState = useSelector((state) => state.userReducer);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  const handleOpenPopover = (e) => {
    setVisible(true);
  };

  const handleClosePopover = () => {
    setVisible(false);
  };

  const handleRightClick = (e) => {
    if (e) {
      e.preventDefault();
      handleOpenPopover();
    }
  };

  const handleMouseOut = (e) => {
    if (e?.relatedTarget?.className !== 'chat-popover') handleClosePopover();
  };
  const fetchChats = useCallback(async () => {
    try {
      const res = await axios.get(`/chat/pagination?limit=${limit}`);
      if (res.errCode === 0) {
        // filter
        let filterChats = res.data;

        if (statusChat === appConstants.FILTER.NOT_READ) {
          filterChats = filterChats.filter(
            (item) => !item.seenBy.includes(user.id)
          );
        }

        if (currentSearch) {
          filterChats = filterChats.filter((item) => {
            const friend = userHandler.getFriend(user, item.participants);
            return (item.name || friend?.userName)
              .toLowerCase()
              .includes(currentSearch.toLowerCase());
          });
        }

        setChats(filterChats);
        setStatus(appConstants.STATE.RESOLVE);
      } else {
        setStatus(appConstants.STATE.REJECT);
      }
    } catch (error) {
      setStatus(appConstants.STATE.REJECT);
      console.log('error', error);
      toast.error('Có lỗi xảy ra');
    }
  }, [chat, currentSearch, statusChat]);

  useEffect(() => {
    if (statusChat === appConstants.FILTER.NOT_READ && chats.length === 0) {
      setStatusChat(appConstants.FILTER.ALL);
    }
  }, [chats]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('contextmenu', handleRightClick);
      containerRef.current.addEventListener('mouseleave', handleMouseOut);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          'contextmenu',
          handleRightClick
        );
        containerRef.current.removeEventListener('mouseleave', handleMouseOut);
      }
    };
  }, [visible]);

  useEffect(() => {
    if (chats && chats.length > 0) {
      chats.forEach((item) => {
        socket.then((socket) => {
          socket.emit('join-room', item._id);
        });
      });
    }
  }, [chats.length]);

  // bắn chat đầu tiên
  // useEffect(() => {
  //   if (fetchChats) {
  //     dispatch(fetchChatsFunc(fetchChats));
  //   }
  // }, [fetchChats]);

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [fetchChats, statusChat, user]);

  const handleTransferDisbandGroupSocket = () => {
    fetchChats();
  };

  const handleNewChatSocket = (data) => {
    fetchChats();
    socket.then((socket) => {
      socket.emit('join-room', data?._id);
    });
  };

  const handleAddMemberSocket = (data) => {
    if (chat?._id === data._id) {
      dispatch(appActions.editGroup(data));
    }
    fetchChats();
  };

  const handleLeaveGroupSocket = (data) => {
    fetchChats();
  };

  const handleGrantSocket = (data) => {
    fetchChats();
  };

  const handleReceiveMessageSocket = (data) => {
    if (chat?._id !== data?.chat) {
      fetchChats();
      userState.fetchNotificationChats();
    }
  };

  const handleOnChangeBackgroundSocket = (data) => {
    const chatId = data?.chatId;
    const background = data?.background;
    const prevChats = [...chats];
    const index = prevChats.findIndex((item) => item._id === chatId);
    if (index !== -1) {
      prevChats[index].background = background;
      setChats(prevChats);
    }
  };

  const handleDeletedMemberSocket = (data) => {
    if (chat?._id === data._id) {
      const participants = data.participants;
      if (!participants.find((item) => item.id === user.id)) {
        dispatch(userActions.accessChat(null));
        fetchChats();
        toast.warn('Bạn đã bị xóa khỏi nhóm ' + data.name);
      } else {
        dispatch(appActions.editGroup(data));
      }
    } else {
      toast.warn('Bạn đã bị xóa khỏi nhóm ' + data.name);
      fetchChats();
    }
  };

  const handleDissolutionChat = (data) => {
    fetchChats();
    if (chat?._id === data._id) {
      dispatch(userActions.accessChat(null));
      toast.warn('Nhóm ' + data.name + ' đã bị giải tán');
    }
  };

  // useEffect(() => {
  //   if (userState.fetchNotificationChats) {
  //     socket.then((socket) => {
  //       socket.on('transfer-disband-group', handleTransferDisbandGroupSocket);
  //       socket.on('new-chat', handleNewChatSocket);
  //       socket.on('add-member', handleAddMemberSocket);
  //       socket.on('leave-group', handleLeaveGroupSocket);
  //       socket.on('grant', handleGrantSocket);
  //       socket.on('receive-message', handleReceiveMessageSocket);
  //       socket.on('change-background', handleOnChangeBackgroundSocket);
  //       socket.on('delete-member', handleDeletedMemberSocket);
  //       socket.on('dissolutionGroupChat', handleDissolutionChat);
  //     });
  //   }

  //   return () => {
  //     socket.then((socket) => {
  //       socket.off('transfer-disband-group', handleTransferDisbandGroupSocket);
  //       socket.off('new-chat', handleNewChatSocket);
  //       socket.off('add-member', handleAddMemberSocket);
  //       socket.off('leave-group', handleLeaveGroupSocket);
  //       socket.off('grant', handleGrantSocket);
  //       socket.off('receive-message', handleReceiveMessageSocket);
  //       socket.off('change-background', handleOnChangeBackgroundSocket);
  //       socket.off('delete-member', handleDeletedMemberSocket);
  //       socket.off('dissolutionGroupChat', handleDissolutionChat);
  //     });
  //   };
  // }, [userState]);

  const handleSelectChat = (nextChat) => {
    dispatch(userActions.accessChat(nextChat));
  };

  const handleSelectChatDebouce = useCallback(
    _.debounce(handleSelectChat, 250),
    []
  );

  const handleOnMouseOver = (chat) => {
    if (!isMouse) setIsMouse(chat);
  };

  const handleOnMouseLeave = () => {
    if (isMouse) setIsMouse(null);
  };

  return (
    <div className="chat-sidebar" ref={containerRef}>
      {chats?.length > 0 &&
        status === appConstants.STATE.RESOLVE &&
        chats.map((item, index) => {
          return (
            <div
              key={item?._id}
              className={
                item?._id === chat?._id ? 'active-chat chat-box' : 'chat-box'
              }
              onMouseOver={() => handleOnMouseOver(item)}
              onMouseLeave={handleOnMouseLeave}
            >
              <div
                onClick={() => handleSelectChatDebouce(item)}
                className="chat-user"
              >
                <ChatUser
                  key={index}
                  chat={item}
                  activeKey={item._id}
                  fetchChats={fetchChats}
                />
              </div>
              <div className="chat-right">
                {isMouse && isMouse._id === item?._id ? (
                  <ChatPopover
                    // options
                    chat={item}
                    visible={visible}
                    onClose={handleClosePopover}
                    onOpen={handleOpenPopover}
                  >
                    <div className="ultils">
                      <div className="ultils-item">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </ChatPopover>
                ) : (
                  <p className="time">
                    {
                      // handle time
                      timeHandler.formatTimeAgo(item?.updatedAt)
                    }
                  </p>
                )}
                {!item?.seenBy.includes(user?.id) && (
                  <div className="notify">
                    <i className="fa-solid fa-bell"></i>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      {status === appConstants.STATE.REJECT && (
        <div
          style={{
            padding: '10px',
          }}
        >
          <p>Không có cuộc trò chuyện nào</p>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
