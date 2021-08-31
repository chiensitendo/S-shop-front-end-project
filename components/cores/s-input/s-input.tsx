import { Form } from "antd";
import { Rule } from "antd/lib/form";
import classNames from "classnames";
import styles from "./s-input.module.scss";

const SInput = (props: Props) => {
    const {children, className, label, name, rules, dependencies, hasFeedback} = props;

    return <Form.Item 
                className = {classNames(className, styles.SInput)}
                label = {label}
                name = {name}
                dependencies = {dependencies}
                rules = {rules ? rules: []}
                hasFeedback = {hasFeedback}
                >{children}</Form.Item>
}

export default SInput;

type Props = {
    label?: string;
    name?: string;
    children?: any;
    className?: string;
    rules?: Rule[];
    dependencies?: any[];
    hasFeedback?: boolean;
}