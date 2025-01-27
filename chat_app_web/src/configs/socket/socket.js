import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_APP_API_URL;

export const socket = createSocket(URL);

function createSocket(url) {
  try {
    if (!url) {
      console.error('URL của máy chủ socket không được cung cấp.');
      return null;
    }

    // Kết nối với máy chủ socket.io
    const socket = io(url, {
      autoConnect: true,
      reconnection: false, // Không tự động kết nối lại (có thể điều chỉnh nếu cần)
      timeout: 5000, // Thời gian timeout kết nối (ms)
    });

    // Lắng nghe sự kiện lỗi
    socket.on('connect_error', (error) => {
      console.error('Lỗi kết nối với máy chủ socket:', error);
    });

    socket.on('disconnect', (reason) => {
      console.warn('Socket bị ngắt kết nối:', reason);
    });

    return socket;
  } catch (error) {
    console.error('Lỗi khi tạo socket:', error);
    return null;
  }
}
