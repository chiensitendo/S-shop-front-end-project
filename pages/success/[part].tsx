import styles from "./success.module.scss";
import SLayout from "@/components/layout/layout";
import SuccessComponent from "@/components/success/success";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
const SuccessPage = (props) => {
    const router: NextRouter = useRouter();
    const { part, email } = props.query;
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState<any>();
    useEffect(() => {
        if (part === "register"){
            setTitle(`Chúc mừng bạn đã đăng ký thành công !`);
            if (email){
                setSubTitle(<p className = {styles.subTitle1}>Chúng tôi đã gửi email xác thực đến <a href = {`mailto:${email}`}><span>{email}</span></a>. <br/>Vui lòng kiểm tra và xác thực email của bạn.</p>);
            }
        }
    },[part, email]);
    return <SLayout>
    {<SuccessComponent 
    title = {title} subTitle = {subTitle}/>}
    
    </SLayout>
}

SuccessPage.getInitialProps = ({query}) => {
    return {query}
}

export default SuccessPage;