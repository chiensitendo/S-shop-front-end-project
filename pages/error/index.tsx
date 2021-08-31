import DefaultButton from "@/components/cores/default_button/default_button";
import SButton from "@/components/cores/s_button/s_button";
import { HomeFilled, LeftCircleFilled, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { HTTP_STATUS } from "libs/const";
import { NextRouter, useRouter } from "next/router";
import styles from "./error.module.scss";

const ErrorPage = (props) => {
    let txt = "Có gì đó bị lỗi mất rồi...";
    let src = '/assets/images/error_cat.svg';
    const router: NextRouter = useRouter();
    const {message, code} = props.query;
    if (code){
        if (+code === HTTP_STATUS.BAD_REQUEST || +code === HTTP_STATUS.BAD_REQUEST){
            src = `/assets/images/${code}_cat.svg`;
        } else {
            src = `/assets/images/${500}_cat.svg`;
        }
    }
    return <div className = {styles.ErrorPage}>
        <div className = {styles.logo}>
            <img className = {styles._logo} src ="/assets/images/long_logo.svg" alt = "SoCheap"/>
        </div>
        <h1>OOPS!</h1>
        <h2>{message ? message : txt}
            <br/>
            <div className = {styles.ButtonGroup}>
                {/* <SButton onClick = {() => router.back()} icon = {<LeftCircleFilled />} color = "green">Quay Lại</SButton> */}
                <SButton onClick = {() => router.push("/home")} icon = {<HomeFilled />}>Trang Chủ</SButton>
            </div>
        </h2>
        <div className = {styles.Buttons}>

        </div>
        <img className = {styles.Cat} src = {src} alt = "SoCheap | Trang Lỗi | Error Page"></img>
    </div>
}
ErrorPage.getInitialProps = ({query}) => {
    return {query}
}
export default ErrorPage;