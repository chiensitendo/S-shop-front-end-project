import styles from './s_button.module.scss';
import { Button } from 'antd';
import classnames from "classnames";

const SButton = (props: Props) => {
    const {className, text, children, htmlType, type, onClick, icon, color, reference, size} = props;
    let ty = (type)? type: "full";
    let co = (color)? color: "primary";
    let cssClass = `${ty}_${co}`;
    let buttonType = htmlType ? htmlType: "button";
    return <Button 
                className = {classnames(
                    className,
                    styles[cssClass],
                    {[styles.icons]: icon})} 
                type = {ty === "outline" ? "default": "primary"} 
                size = {size === undefined ? "large": size}
                icon = {icon}
                htmlType = {buttonType}
                onClick = {onClick && onClick}
                ref = {reference}
            >{children ? children: text}</Button>

}

export default SButton;

type Props = {
    className?: any;
    text?: string;
    children?: any;
    type?: "outline" | "full";
    htmlType?: "button" | "submit" |  "reset";
    onClick?: () => void;
    icon?: any;
    color?: "secondary" | "primary" | "green";
    reference?: any;
    size?: "large" | "middle" | "small"
}