import { getTimer, getVisit, updateVisit } from "apis/master-api";
import { TIMER_ID, ViSIT_ID } from "libs/const";
import { getNumberString, openNotificationWithIcon } from "libs/ultility";
import React from "react";
import styles from "./comming.module.scss";
import { Spin } from 'antd';
import SearchInput from "../cores/search-input/search-input";

const Comming = () => {
    const [time, setTime] = React.useState<Time>({
        days: '0',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(0);
    React.useEffect(() => {
        if (isLoaded){
            setInterval(() => {
                let t = time;
                let sc = +time.seconds + 1;
                let min  = +time.minutes;
                let h = +time.hours;
                let d = +time.days;
                if (sc >= 60){
                    min = min + 1;
                    t.seconds = '00';
                } else {
                    t.seconds = getNumberString(sc);
                }
                if (min >= 60) {
                    h =  h + 1;
                    t.minutes = '00';
                } else {
                    t.minutes = getNumberString(min);
                }
                if (h >= 24){
                    d = d + 1;
                    t.days = d + '';
                    t.hours = '00';
                } else {
                    t.hours = getNumberString(h);
                }
                setTime(Object.assign({}, t));
                
            }, 1000); 
        }
    },[isLoaded]);

    React.useEffect(() => {
        getTimer(TIMER_ID).then(res => {
            if (res){
                setTime(res.data);
                setIsLoaded(true);
            }
        }).catch(err => {
            console.log(err);
            setIsLoaded(true);
        });
        getVisit(ViSIT_ID).then(res => {
            setCount(res.data.times + 1);
        }).catch(err => console.log(err));
        openNotificationWithIcon('success', "C???m ??n b???n ???? gh?? th??m S - Shop!", "");
        updateVisit(ViSIT_ID).then().catch(err => console.log(err));              
        return () => {
            clearInterval();
        }
    },[]);

    return <div className = {styles.Comming}>
        <div className = {styles.overlay}></div>
        <div className = {styles.background}></div>
        {/* <video autoPlay muted loop className = "pc">
                <source src="/assets/images/background-video.mp4" type="video/mp4"/>
                Your browser does not support HTML5 video.
        </video>
        <video autoPlay muted loop className = "sp">
                <source src="/assets/images/background-video-mobile.mp4" type="video/mp4"/>
                Your browser does not support HTML5 video.
        </video> */}
        <div className = {styles.container}>
            <h1>COMMING SOON</h1>
            <div className = {styles.times}>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded && <h1>{time.days}</h1>}
                    <p>Ng??y</p>
                </div>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded &&<h1>{time.hours}</h1>}
                    <p>Gi???</p>
                </div>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded && <h1>{time.minutes}</h1>}
                    <p>Ph??t</p>
                </div>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded && <h1>{time.seconds}</h1>}
                    <p>Gi??y</p>
                </div>
            </div>
            <div className = {styles.letter}>
                <p>
                        Website c???a ch??ng t??i ??ang trong qu?? tr??nh ho??n thi???n. ????y l?? m???t s???n ph???m cung c???p t???t c??? c??c m???t h??ng c???a ch??ng t??i c?? cho c??c b???n v???i s??? <strong>?????m b???o cao nh???t v?? ch???t l????ng nh???t</strong>.<br/>
                            H??y tr???i nghi??m d???ch v??? c???a ch??ng t??i c??ng v???i nh???ng ??u ????i c???c l???n v?? nh???ng ch???c n??ng h???p d???n c???a <strong>S - Shop</strong><br/>
                        N???u c?? b???t k?? v???n ????? g?? ho???c th???c m???c xin vui l??ng li??n h??? qua email: <a>sang9c.nguyendu@gmail.com</a>
                </p>
            </div>
            <div className = {styles.sending}>
                <p>????? nh???n nh???ng c???p nh???t m???i nh???t c??ng nh?? nh???ng ch????ng tr??nh h???p d???n: </p>
                <SearchInput placeholder = "Xin vui l??ng nh???p email c???a b???n." enterButton = "????ng k??"></SearchInput>
                <p>S??? ng?????i ???? gh?? th??m: {count}</p>
            </div>
        </div>
    </div>
}

export default Comming;

type Time =  {
    days: string,
    hours: string,
    minutes: string,
    seconds: string
}