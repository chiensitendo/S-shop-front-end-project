import { notification } from "antd";

export const getNumberString = (number: number) => {
    if (number === undefined || number === null) {
        return '';
    }
    if (number < 10){
        return `0${number}`;
    } else {
       return number + '';
    }
}

export const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description:
      description,
    });
  };