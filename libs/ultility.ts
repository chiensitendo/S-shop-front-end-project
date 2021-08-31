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

  import { Rule } from "antd/lib/form";
import { RULE_TYPE } from "./types";

export const createRules = (name: string, types: number[], add?: any): Rule[] => {
    let rules: Rule[] = [];
    if (types.includes(RULE_TYPE.REQUIRED)){
        rules.push({ required: true, message: `Xin hãy điền ${name} của bạn!` });
    }
    if (types.includes(RULE_TYPE.CHECKBOX_REQUIRED)){
        rules.push({ required: true, message: `Xin hãy check vào hộp kiểm '${name}'!` });
    }  
    if (types.includes(RULE_TYPE.PASSWORD)) {
        rules.push({pattern: RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/), message: `Mật khẩu bao gồm ít nhất 8 ký tự, chữ thường, chữ in hoa và số.`})
    }
    if (types.includes(RULE_TYPE.EMAIL)){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        rules.push({pattern: RegExp(regex), message: "Định dạng email không đúng!"});
    }
    if (add){
        rules.push(add);
    }
    return rules;
}

export function capitalizeFirstLetter(string) {
    if (!string){
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }