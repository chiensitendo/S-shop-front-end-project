import styles from "./subscribe_modal.module.scss";
import classNames from "classnames";
import Modal from "antd/lib/modal/Modal";
import { Form, Input } from 'antd';
import SInput from "../cores/s-input/s-input";
import { createRules } from "libs/ultility";
import { RULE_TYPE } from "libs/types";
import DefaultButton from "../cores/default_button/default_button";
import { insertSubscribe } from "apis/master-api";
import { useTranslation } from "next-i18next";
import React from "react";
const SubscribeModal = (props: Props) => {
    const {t} = useTranslation();
    const {className, isModalVisible, handleOk, handleCancel, onResult
        } = props;
    const [isLoad, setIsLoad] = React.useState(true);

    React.useEffect(() => {
        setIsLoad(false);
    },[]);
    const onFinish = (values: any) => {
        insertSubscribe({
            name: values.name,
            email: values.email
        }).then(res => {
            onResult && onResult(true);
        }).catch(err => {
            onResult && onResult(false);
        });
    };
    const onFinishFailed = (errorInfo: any) => {
    };
     return !isLoad && <Modal className = {classNames(className, styles.SubscribeModal)}
                title={null} visible={isModalVisible}
                centered = {true} 
                footer = {null}
                onCancel = {handleCancel}>
                    <div className = {styles.Left}>
                        <img src = "assets/images/paper_fly.svg"/>
                    </div>
                    <div className = {styles.Content}>
                        <h2>{t('subscribe')}</h2>
                        <p>{t('subscribe_content')}</p>
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
                                    <DefaultButton className = {styles.submitButton} htmlType = "submit">{t('register')}</DefaultButton>
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
    onResult?: (isSuccess: boolean) => void
}
