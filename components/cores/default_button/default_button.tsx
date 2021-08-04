import styles from './default_button.module.scss';
import { Button } from 'antd';
import classnames from "classnames";

const DefaultButton = (props: Props) => {
    const {className, text, children, htmlType, type, onClick, icon, color, reference} = props;
    let ty = (type)? type: "full";
    let buttonType = htmlType ? htmlType: "button";
    return <div className = {classnames(className, styles.DefaultButton)}>
                <Button 
                    className = {classnames({
                        [styles.primary]: ty === "full", 
                        [styles.outlinePrimary]: ty === "outline",
                        [styles.primary_color_full]: (ty === "full" && (!color || color === "primary")),
                        [styles.secondary_color_full]: (ty === "full" && (color && color === "secondary"))})} 
                    type = {ty === "outline" ? "default": "primary"} 
                    size = "large"
                    icon = {icon}
                    htmlType = {buttonType}
                    onClick = {onClick && onClick}
                    ref = {reference}
                >{children ? children: text}</Button>
        </div>

}

export default DefaultButton;

type Props = {
    className?: any;
    text?: string;
    children?: any;
    type?: "outline" | "full";
    htmlType?: "button" | "submit" |  "reset";
    onClick?: () => void;
    icon?: any;
    color?: "secondary" | "primary";
    reference?: any;
}