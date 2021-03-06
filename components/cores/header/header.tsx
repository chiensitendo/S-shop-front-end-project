import styles from "./header.module.scss";
import classNames from "classnames";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import {MenuOutlined, UserOutlined} from '@ant-design/icons';
import DefaultButton from "../default_button/default_button";
import { Drawer } from "antd";
import Avatar from "antd/lib/avatar/avatar";
const SHeader = (props: Props) => {
    const router: NextRouter = useRouter();
    const path = router.pathname;
    const [visible, setVisible] = React.useState(false);
    const onClose = () => {
        setVisible(false);
      };
    const showDrawer = () => {
        setVisible(true);
    };
    const goToRegisterPage = () =>{
        router.push("/account/register");
    }
    const {className} = props;
    return <div className = {classNames(className, styles.Header)}>
        <div className = {styles.logo}>
            <img className = {styles._logo} src ="/assets/images/long_logo.svg" alt = "SoCheap"/>
        </div>
        <div className = {styles.menu}>
            <div className = {classNames(styles.menu_item, {[styles.menu_active]: (path === "/" || path === "/home")})}>
                <a href = "/home"><p>Home</p></a></div>
                <div className = {classNames(styles.menu_item, {[styles.menu_active]: (path.startsWith("/blog"))})}>
                <a href = "/blog"><p>Blog</p></a></div>
            <div className = {classNames(styles.menu_item, {[styles.menu_active]: (path === "/about")})}>
                <a href = "/about"><p>About</p></a></div>
            <div className = {styles.menu_button}>
                <MenuOutlined onClick = {() => showDrawer()} />
            </div>
        </div>
        <div className = {styles.actions}>
            <div className = {styles.group}>
                <div className = {styles.button}>
                    <DefaultButton onClick = {goToRegisterPage}>Đăng nhập</DefaultButton>
                </div>
                <div className = {styles.icon} onClick = {goToRegisterPage} >
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>
                
            </div>
        </div>
        <Drawer
          title= {<div className = {styles.drawerTitle}><img src ="assets/images/long_logo.svg" alt = "SoCheap"/></div>}
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
          headerStyle = {{backgroundColor: "#0c5179"}}
          bodyStyle = {{padding: 0}}
        >
          <a href = "/home"><div className = {classNames(styles.drawerItem,{[styles.drawerActive]: (path === "/" || path === "/home")})}><p>Home</p></div></a>
          <a href = "/blog"><div className = {classNames(styles.drawerItem,{[styles.drawerActive]: (path.startsWith("/blog"))})}><p>Blog</p></div></a>
          <a href = "/about"><div className = {classNames(styles.drawerItem,{[styles.drawerActive]: (path === "/about")})}><p>About</p></div></a>
        </Drawer>
    </div>
}

export default SHeader;

type Props = {
    className?: string;
}