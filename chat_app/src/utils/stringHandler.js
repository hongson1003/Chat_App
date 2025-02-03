const convertPhoneViToInternational = (phone) => {
  if (phone.startsWith('0')) {
    return '+84' + phone.slice(1);
  }
  return phone;
};

const stringHandler = { convertPhoneViToInternational };

export default stringHandler;
