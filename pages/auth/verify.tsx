import SuccessComponent from "@/components/success/success";
import { Response } from "apis/models/responses/response";
import { verifyUser } from "apis/user-api";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import SLayout from "@/components/layout/layout";

const VerifyAuthPage = (props) => {
    const router: NextRouter = useRouter();
    const {id, verifyToken} = props.query;
    const [isSuccess, setIsSuccess] = React.useState(false);
    React.useEffect(() => {
        if (!id || !verifyToken){
            router.push("/404");
        } else {
            verifyUser({
                id : id, 
                verifyToken: verifyToken
            }).then(res => {
                setIsSuccess(true);
            }).catch((err: Response) => {
                router.push(`/error?code=${err.code}&message=${err.message}`);
            })
        }
    },[id, verifyToken]);
    return <SLayout>
        {isSuccess && <SuccessComponent 
        title = {"Chúc mừng bạn đã xác thực email thành công !"}/>}
    </SLayout>
}

VerifyAuthPage.getInitialProps = ({query}) => {
    return {query}
}

export default VerifyAuthPage;