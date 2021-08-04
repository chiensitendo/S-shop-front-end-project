import styles from "./subscribe_modal.module.scss";
import classNames from "classnames";
import Modal from "antd/lib/modal/Modal";
import { Form, Input, Checkbox } from 'antd';
import SInput from "../cores/s-input/s-input";
import { createRules } from "libs/ultility";
import { RULE_TYPE } from "libs/types";
import DefaultButton from "../cores/default_button/default_button";
import { insertSubscribe } from "apis/master-api";
const SubscribeModal = (props: Props) => {
    const {className, isModalVisible, handleOk, handleCancel, subscribe, subscribe_content, t} = props;
    const onFinish = (values: any) => {
        console.log('Success:', values);
        insertSubscribe(values.email).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
     return <Modal className = {classNames(className, styles.SubscribeModal)}
                title={null} visible={isModalVisible}
                centered = {true} 
                footer = {null}
                onCancel = {handleCancel}>
                    <div className = {styles.Left}>
                        <img src = "assets/images/paper_fly.svg"/>
                    </div>
                    <div className = {styles.Content}>
                        <h2>{subscribe}</h2>
                        <p>{subscribe_content}</p>
                        <Form 
                                name="subscribe"
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                className = {styles.Form}
                            >
                                <SInput
                                    name="name"
                                    rules={createRules("name", [RULE_TYPE.REQUIRED])}                                    
                                ><Input placeholder = {t('name_input_placeholder')}/></SInput>
                                <div className = {styles.space}></div>
                                <SInput 
                                    name="email"
                                    rules={createRules("email", [RULE_TYPE.REQUIRED, RULE_TYPE.EMAIL])}                                    
                                ><Input placeholder = {t('email_input_placeholder')}/></SInput>
                                <Form.Item>
                                    <DefaultButton className = {styles.submitButton} htmlType = "submit">Đăng ký</DefaultButton>
                                </Form.Item>
                        </Form>
                    </div>
            </Modal>
}

export default SubscribeModal;

type Props = {
    className?: string;
    isModalVisible?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    subscribe?: string;
    subscribe_content?: string;
    t: any;
}
