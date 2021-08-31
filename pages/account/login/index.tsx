import styles from "./login.module.scss";
import { withLogin } from "higgerComponents/auth";
import { Card, Divider, Form, Input } from "antd";
import Meta from "antd/lib/card/Meta";
import SButton from "@/components/cores/s_button/s_button";
import { FcGoogle } from "react-icons/fc";
import SInput from "@/components/cores/s-input/s-input";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createRules, openNotificationWithIcon } from "libs/ultility";
import { LocalStorageUserInfoModel, LocalStorageUserModel, RULE_TYPE } from "libs/types";
import { NextRouter, useRouter } from "next/router";
import { io } from "socket.io-client";
import { LOCALSTORAGE_KEY, SERVER_URL } from "libs/const";
import React from "react";
import { closeLoading, openLoading } from "services/loading";
import { Response } from "apis/models/responses/response";
import SuccessModal from "@/components/cores/success_modal/success_modal";
import { LoginResponse } from "apis/models/responses/login-response";


const socket = io(`${SERVER_URL}`);

const LoginPage = () => {
    const [isServerConnect, setIsServerConnect] = React.useState(false);
    const [isSocketConnect, setIsSocketConnect] = React.useState(false);
    const [socketId, setSocketId] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const router: NextRouter = useRouter();
    const onFinish = (values: any) => {
        console.log(values);
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
        socket.on("login-fail", (err: Response) => {
            closeLoading();
            setIsError(true);
            setErrorMessage(err.message);
        })
        socket.on("login-error", (err: Response) => {
            closeLoading();
            router.push(`/error?code=${err.code}&message=${err.message}`);
        })
        socket.on("login-success", (res: LoginResponse) => {
            closeLoading();
            let user: LocalStorageUserModel = {
                email: res.email,
                token: res.accessToken,
                refreshToken: res.refreshToken,
                tokenType: "Bearer",
                expiredTime: res.expiredTime,
                id: res.id,
                isCompleted: res.isCompleted,
                roles: res.roles,
                username: res.username
            }
            let info: LocalStorageUserInfoModel = {
                id: res.id,
                avatarUrl: res.avatarUrl,
                firstName: res.firstname,
                lastName: res.lastname
            }
            user.info = info;
            localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(user));
            router.push(`/home`);
        })
        return () => {
            socket.disconnect();
            setIsSocketConnect(false);
        }
    },[]);

    React.useEffect(() => {
        if (!isServerConnect && isSocketConnect){
            openNotificationWithIcon('error', "Mất kết nối với máy chủ", "");
        }
    },[isServerConnect, isSocketConnect])

    return <div className = {styles.LoginPage}>
                <div className = {styles.container}>
                    <Card className = {styles.Card}>
                    <Meta title = {<div className = {styles.Title}>
                        <img className = {styles._logo} src ="/assets/images/long_logo.svg" alt = "SoCheap"/>
                        <h1>ĐĂNG NHẬP</h1>
                    </div>}></Meta>
                    <Form 
                        className = {styles.Form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <SInput name = "loginId" hasFeedback = {true} rules = {createRules("đăng nhập hoặc email",[RULE_TYPE.REQUIRED])}>
                            <Input prefix={<UserOutlined />} required className = {styles.Input} placeholder = "Vui lòng điền tên đăng nhập hoặc email"></Input>
                        </SInput>
                        <SInput  name = "password" hasFeedback = {true} rules = {createRules("mật khẩu",[RULE_TYPE.REQUIRED, RULE_TYPE.PASSWORD])}>
                            <Input.Password prefix={<LockOutlined  />} className = {styles.Input} required placeholder="Vui lòng điền mật khẩu của bạn" />    
                        </SInput>
                        <div className = {styles.Remember}>
                            <Form.Item name="remember" valuePropName="checked" >
                                {/* <Checkbox>Ghi nhớ tài khoản</Checkbox> */}
                            </Form.Item>
                            <a href = "/account/re-password"><p>Quên mật khẩu?</p></a>
                        </div>
                        <Form.Item>
                            <div className = {styles.ButtonGroup}>
                                <SButton htmlType = "submit" text = "Đăng nhập"/>
                            </div>
                        </Form.Item>                                     
                    </Form>
                    <div className = {styles.ButtonGroup}>
                        <SButton type = "outline" onClick = {() => {
                            if (!isServerConnect){
                                openNotificationWithIcon('error', "Mất kết nối với máy chủ", "");
                                return;
                            }                        
                            if(!socketId){
                                    window.location.reload();
                                    return;
                            }
                            window.open(`${SERVER_URL}/google/login?id=${socketId}`, "_blank");
                            openLoading();
                        }} icon = {<FcGoogle/>} >Đăng nhập bằng Google</SButton>
                    </div>
                    <Divider/>
                    <div className = {styles.ButtonGroupWithText}>
                        <p>Bạn chưa có tài khoản SoCheap?</p>
                        <SButton color = "green" onClick = {() => {
                            router.push("/account/register");
                        }} >Tạo tài khoản</SButton>
                    </div>
                </Card>
                </div>
                <SuccessModal
                    status = "error" 
                    visible = {isError}
                    onCancel = {() => setIsError(false)} 
                    title = "Đăng ký thất bại!" 
                    subTitle = {<p>Đăng ký thất bại rùi vui lòng đăng ký lại nhé!<br></br>{errorMessage}</p>}/>
            </div>
}

export default withLogin(LoginPage);