import { Button, Result } from "antd";
import classNames from "classnames";
import styles from "./success.module.scss";
import SButton from "../cores/s_button/s_button";
import { NextRouter, useRouter } from "next/router";
const SuccessComponent = (props: Props) => {
    const {className, title, subTitle} = props;
    const router: NextRouter = useRouter();
    const handleClick = (url) => () => {
        router.push(url);
    }
    return <div className = {classNames(className,styles.SuccessComponent)}>
          <Result
                status="success"
                title={title}
                subTitle={subTitle}
                extra={[
                <SButton type = "outline" color = "green" key="login" onClick ={handleClick("/login")}>
                    Đăng Nhập
                </SButton>,
                <SButton key="home" onClick ={handleClick("/home")}>
                    Trang chủ
                </SButton>
                ]}
         />,
    </div>
}

export default SuccessComponent;

type Props = {
    className?: string;
    title?: string;
    subTitle?: any;
}