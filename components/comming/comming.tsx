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
            setCount(res.data.times);
        }).catch(err => console.log(err));
        openNotificationWithIcon('success', "Cảm ơn bạn đã ghé thăm S - Shop!", "");
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
                    <p>Ngày</p>
                </div>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded &&<h1>{time.hours}</h1>}
                    <p>Giờ</p>
                </div>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded && <h1>{time.minutes}</h1>}
                    <p>Phút</p>
                </div>
                <div>
                    {!isLoaded && <Spin size="large" />}
                    {isLoaded && <h1>{time.seconds}</h1>}
                    <p>Giây</p>
                </div>
            </div>
            <div className = {styles.letter}>
                <p>
                        Website của chúng tôi đang trong quá trình hoàn thiện. Đây là một sản phẩm cung cấp tất cả các mặt hàng của chúng tôi có cho các bạn với sự <strong>đảm bảo cao nhất và chất lương nhất</strong>.<br/>
                            Hãy trải nghiêm dịch vụ của chúng tôi cùng với những ưu đãi cực lớn và những chức năng hấp dẫn của <strong>S - Shop</strong><br/>
                        Nếu có bất kì vấn đề gì hoặc thắc mắc xin vui lòng liên hệ qua email: <a>sang9c.nguyendu@gmail.com</a>
                </p>
            </div>
            <div className = {styles.sending}>
                <p>Để nhận những cập nhật mới nhất cũng như những chương trình hấp dẫn: </p>
                <SearchInput placeholder = "Xin vui lòng nhập email của bạn." enterButton = "Đăng ký"></SearchInput>
                <p>Số người đã ghé thăm: {count}</p>
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