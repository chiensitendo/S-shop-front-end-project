
import SHeader from "../cores/header/header";
import styles from "./layout.module.scss";

export default function SLayout(props: Props) {
    const {children} = props;
    return <div className = {styles.SLayout}>
            <SHeader className = {styles.header}></SHeader>
            {children}
        </div>
}

type Props = {
    children?: any
}