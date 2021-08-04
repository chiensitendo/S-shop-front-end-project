import styles from "./sns_button_group.module.scss";
import classNames from "classnames";
const SnSButtonGroup =(props:Props) => {
    const {className} = props;
    return <div className = {classNames(styles.SnSButtonGroup, className)}>
        <a href = "https://www.facebook.com/SoCheap-106983868352988" target = "_blank">
            <img src = "assets/icons/facebook.svg" alt = "F"/>
        </a>
    </div>
}

export default SnSButtonGroup;

type Props = {
    className?: string;
}