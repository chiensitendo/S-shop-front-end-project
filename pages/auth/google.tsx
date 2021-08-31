import { NextRouter, useRouter } from "next/router";
import React, { useRef } from "react";

const GoogleAuthPage = (props) => {
    const router: NextRouter = useRouter();
    const {isSuccess} = props.query;
    const ref = useRef(null);
    React.useEffect(() => {
        if (ref){
            ref.current.click();
        }
    },[isSuccess, ref]);
    return <div><a hidden ref = {ref} onClick = {() => window.open('','_self').close()}>close</a></div>
}

GoogleAuthPage.getInitialProps = ({query}) => {
    return {query}
}

export default GoogleAuthPage;