export const timeHandler = {
  getTimeFromDate: (date) => {
    const time = new Date(date);
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let hours = time.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    return `${hours}:${minutes}`;
  },

  accessTimeBefore: (time) => {
    const currentTime = new Date();
    const timeBefore = new Date(time);
    const timeDiff = currentTime - timeBefore;
    const seconds = timeDiff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    if (days >= 1) {
      return `${Math.floor(days)} ngày trước`;
    } else if (hours >= 1) {
      return `${Math.floor(hours)} giờ trước`;
    } else if (minutes >= 1) {
      return `${Math.floor(minutes)} phút trước`;
    } else {
      return 'Vừa xong';
    }
  },

  formatTimeAgo: (timestamp) => {
    const now = new Date();
    const sentTime = new Date(timestamp);

    const timeDifference = now - sentTime;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (secondsDifference < 60) {
      return 'Vài giây';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} phút`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} giờ`;
    } else {
      return `${daysDifference} ngày`;
    }
  },
};
