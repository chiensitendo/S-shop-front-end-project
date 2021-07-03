import { getNumberString } from "libs/ultility";
import React from "react";
import styles from "./comming.module.scss";

const Comming = () => {

    const [time, setTime] = React.useState<Time>({
        days: '0',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    React.useEffect(() => {
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
        return () => {
            clearInterval();
        }
    },[]);

    return <div className = {styles.Comming}>
        <div className = {styles.overlay}></div>
        <div className = {styles.background}></div>
        <div className = {styles.container}>
            <h1>COMMING SOON</h1>
            <div className = {styles.times}>
                <div>
                    <h1>{time.days}</h1>
                    <p>Ngày</p>
                </div>
                <div>
                    <h1>{time.hours}</h1>
                    <p>Giờ</p>
                </div>
                <div>
                    <h1>{time.minutes}</h1>
                    <p>Phút</p>
                </div>
                <div>
                    <h1>{time.seconds}</h1>
                    <p>Giây</p>
                </div>
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