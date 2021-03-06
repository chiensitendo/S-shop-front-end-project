import DefaultButton from "@/components/cores/default_button/default_button";
import SInput from "@/components/cores/s-input/s-input";
import SuccessModal from "@/components/cores/success_modal/success_modal";
import SButton from "@/components/cores/s_button/s_button";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import { getProvinces } from "apis/master-api";
import { RegisterRequest } from "apis/models/requests/register_request";
import { ProvinceListItem } from "apis/models/responses/provinceListItem";
import { Response } from "apis/models/responses/response";
import { registerUser } from "apis/user-api";
import { ACCOUNT_TYPE, GENDERS, ROLES, SERVER_URL } from "libs/const";
import { RULE_TYPE } from "libs/types";
import { createRules, openNotificationWithIcon } from "libs/ultility";
import { NextRouter, useRouter } from "next/router";
import React, { useMemo } from "react";
import { closeLoading, openLoading } from "services/loading";
import { io } from "socket.io-client";
import styles from "./register.module.scss";
import { FcGoogle } from 'react-icons/fc';

const socket = io(`${SERVER_URL}`);

const AccountRegisterPage = (props) => {
    const [isServerConnect, setIsServerConnect] = React.useState(false);
    const [isSocketConnect, setIsSocketConnect] = React.useState(false);
    const [socketId, setSocketId] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const router: NextRouter = useRouter();
    const provinces: ProvinceListItem[] = useMemo(() => {
        if (!props || !props.provinces){
            return [];
        }
        return props.provinces.map(province => ({id: +province.id, name: province.name}));
    },[props]);

    const onFinish = (values: any) => {
        let req: RegisterRequest = {
            address: values.address,
            email: values.email,
            gender: +values.gender,
            password: values.password,
            provinceId: +values.provinceId,
            firstname: values.firstname,
            lastname: values.lastname,
            roleId: ROLES.CUSTOMER,
            username: values.username,
            accountType: ACCOUNT_TYPE.NORMAL
        }
        registerUser(req).then(res => {
            router.push(`/success/register?email=${req.email}`);
        }).catch(err => {
            setIsError(true);
            if (err.message){
                setErrorMessage(err.message);
            }
        })
    };
    const onFinishFailed = (errorInfo: any) => {
    };

    React.useEffect(() => {
        socket.connect();
        socket.on('connection', (message) => {
            console.log('server connected');
            setSocketId(message.id);
            setIsServerConnect(true);
            setIsSocketConnect(true);

        });
        socket.on('disconnect', () => {
            console.log('server disconnected');
            setIsServerConnect(false);
        });
        socket.on("register-fail", (err: Response) => {
            closeLoading();
            setIsError(true);
            setErrorMessage(err.message);
        })
        socket.on("register-error", (err: Response) => {
            closeLoading();
            router.push(`/error?code=${err.code}&message=${err.message}`);
        })
        socket.on("register-success", (user) => {
            closeLoading();
            router.push(`/success/register`);
        })
        return () => {
            socket.disconnect();
            setIsSocketConnect(false);
        }
    },[]);

    React.useEffect(() => {
        if (!isServerConnect && isSocketConnect){
            openNotificationWithIcon('error', "M???t k???t n???i v???i m??y ch???", "");
        }
    },[isServerConnect, isSocketConnect])


    return <div className = {styles.AccountRegisterPage}>
        <div className = {styles.container}>
            <Card hoverable className = {styles.Card}>
                <Meta title = {<div className = {styles.Title}>
                    <img className = {styles._logo} src ="/assets/images/long_logo.svg" alt = "SoCheap"/>
                    <h1>????NG K?? T??I KHO???N</h1>
                </div>}></Meta>
                <div className = {styles.ButtonGroup}>
                    <SButton type = "outline" onClick = {() => {
                       if (!isServerConnect){
                            openNotificationWithIcon('error', "M???t k???t n???i v???i m??y ch???", "");
                            return;
                       }                        
                       if(!socketId){
                            window.location.reload();
                            return;
                       }
                       window.open(`${SERVER_URL}/google/auth?id=${socketId}`, "_blank");
                       openLoading();
                    }} icon = {<FcGoogle/>} >????ng k?? b???ng Google</SButton>
                </div>
                <Form 
                    className = {styles.Form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <SInput name = "firstname" hasFeedback = {true} rules = {createRules("firstname",[RULE_TYPE.REQUIRED])}>
                        <Input required className = {styles.Input} placeholder = "Vui l??ng ??i???n h??? c???a b???n"></Input>
                    </SInput>
                    <SInput name = "lastname" hasFeedback = {true} rules = {createRules("lastname",[RULE_TYPE.REQUIRED])}>
                        <Input required className = {styles.Input} placeholder = "Vui l??ng ??i???n t??n c???a b???n"></Input>
                    </SInput>
                    <SInput name = "username" hasFeedback = {true} rules = {createRules("username",[RULE_TYPE.REQUIRED])}>
                        <Input prefix={<UserOutlined />} required className = {styles.Input} placeholder = "Vui l??ng ??i???n t??n ????ng nh???p"></Input>
                    </SInput>
                    <SInput name = "email" hasFeedback = {true} rules = {createRules("username",[RULE_TYPE.REQUIRED, RULE_TYPE.EMAIL])}>
                        <Input required className = {styles.Input} placeholder = "Vui l??ng ??i???n email c???a b???n"></Input>
                    </SInput>
                    <SInput  name = "password" hasFeedback = {true} rules = {createRules("password",[RULE_TYPE.REQUIRED, RULE_TYPE.PASSWORD])}>
                        <Input.Password prefix={<LockOutlined  />} className = {styles.Input} required placeholder="Vui l??ng ??i???n m???t kh???u c???a b???n" />    
                    </SInput>
                    <SInput name = "re-password" hasFeedback = {true} dependencies = {['password']} rules = {createRules("re-password",[RULE_TYPE.REQUIRED],
                    ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Hai m???t kh???u kh??ng kh???p v???i nhau'));
                            },
                    }))}>
                        <Input.Password className = {styles.Input} required placeholder="Vui l??ng nh???p l???i m???t kh???u" />    
                    </SInput>
                    <Form.Item name = "provinceId" hasFeedback rules = {createRules("provinceId", [RULE_TYPE.REQUIRED])}>
                        <Select className = {styles.Select} placeholder = "Vui l??ng ch???n t???nh b???n ??ang s???ng">
                            {provinces.map((province, index) => {
                                return <Select.Option key = {index} value = {province.id}>{province.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <SInput name = "address" hasFeedback = {true}>
                        <Input className = {styles.Input} required placeholder="Vui l??ng ??i???n ?????a ch??? c???a b???n" />    
                    </SInput>
                    <Form.Item name = "gender" hasFeedback rules = {createRules("provinceId", [RULE_TYPE.REQUIRED])}>
                        <Select className = {styles.Select} placeholder = "Vui l??ng ch???n gi???i t??nh c???a b???n">
                            {GENDERS.map((gender, index) => {
                                return <Select.Option key = {index} value = {gender.value}>{gender.label}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <DefaultButton htmlType = "submit" text = "????ng k??"/>
                    </Form.Item>                                     
                </Form>
            </Card>
        </div>
        <SuccessModal
              status = "error" 
              visible = {isError}
              onCancel = {() => setIsError(false)} 
              title = "????ng k?? th???t b???i!" 
              subTitle = {<p>????ng k?? th???t b???i r??i vui l??ng ????ng k?? l???i nh??!<br></br>{errorMessage}</p>}/>
    </div>
}


export default AccountRegisterPage;

export async function getServerSideProps(context) {
    const res = await getProvinces();
    const data = await res.data;
    if (!data) {
      return {
        error: true,
      }
    }
    return {
      props: {
          provinces: data
      }
    }
  }