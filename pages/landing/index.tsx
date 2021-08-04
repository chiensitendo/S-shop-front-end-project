import styles from "./landing.module.scss";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import SnSButtonGroup from "@/components/sns_button_group/sns-button-group";
import SubscribeModal from "@/components/subscribe_modal/subscribe_modal";

const LandingPage = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const {t, i18n} = useTranslation();
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    return <div className = {styles.Landing}>
        <img src ="assets/images/long_logo.svg" alt = "SoCheap"/>
        <div className = {styles.container}>
            <div className = {styles.title}>
                <h1>{t('welcome')}</h1>
                <img className = {styles._logo} src ="assets/images/long_logo.svg" alt = "SoCheap"/>
                <SnSButtonGroup className = {styles.snsButtonGroup}/>
            </div>
            <div className = {styles.banner}>
                <img src = "assets/images/landing_1.svg"/>
            </div>
        </div>
        <SubscribeModal 
            isModalVisible = {isModalVisible} 
            handleOk = {handleOk} 
            handleCancel = {handleCancel}
            subscribe = {t('subscribe')}
            subscribe_content = {t('subscribe_content')} t = {t}/>
    </div>
}

export default LandingPage;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common','landing_page'])),
        // Will be passed to the page component as props
      },
    };
  }