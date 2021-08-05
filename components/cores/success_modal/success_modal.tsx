import styles from "./success_modal.module.scss";
import classNames from "classnames";
import Modal from "antd/lib/modal/Modal";
import { Result } from "antd";
import { useTranslation } from "next-i18next";
const SuccessModal = (props: Props) => {
    const {className, visible, title, subTitle, status, afterClose, onCancel} = props;
    const {t} = useTranslation();
    return <Modal 
                visible = {visible} 
                className = {classNames(className, styles.SuccessModal)}
                footer = {null}
                centered title = {null} 
                afterClose = {afterClose && afterClose}
                onCancel = {onCancel && onCancel}>
        <Result status = {status} title = {title} subTitle = {subTitle}></Result>
    </Modal>
}

export default SuccessModal;
type Props = {
    className?: string;
    visible?: boolean;
    title?: string;
    subTitle?: string;
    status: "success" | "error" | "info" | "warning";
    afterClose?: () => void;
    onCancel?: () => void;
}