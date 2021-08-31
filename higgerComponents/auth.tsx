import { LOCALSTORAGE_KEY } from "libs/const";
import { LocalStorageUserModel } from "libs/types";
import { openNotificationWithIcon } from "libs/ultility";
import { NextRouter, useRouter } from "next/dist/client/router";
import React from "react"


export function withLogin(WrappedComponent) {
    
    return () => {
        const router: NextRouter= useRouter();
        const [isUnAuth, setIsUnAuth] = React.useState(false);
        React.useEffect(() => {
            try {
                let obj = localStorage.getItem(LOCALSTORAGE_KEY);
                
                if (obj === null){
                    setIsUnAuth(true);
                } else {
                    let user: LocalStorageUserModel = JSON.parse(obj);
                    const currentTimestamp = new Date().getTime();
                    if (currentTimestamp <= user.expiredTime) {
                        setIsUnAuth(false);
                        router.push("/home");
                    } else {
                        openNotificationWithIcon('error', "Token hết hạn!", "");
                        localStorage.removeItem(LOCALSTORAGE_KEY);
                        setIsUnAuth(true);
                    }
                }      
            } catch(e){
                setIsUnAuth(true);
            }
        },[]);
        return isUnAuth && <WrappedComponent />;
    }
}
