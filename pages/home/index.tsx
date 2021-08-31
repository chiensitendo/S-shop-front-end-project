import styles from "./home.module.scss";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import SnSButtonGroup from "@/components/sns_button_group/sns-button-group";
import SubscribeModal from "@/components/subscribe_modal/subscribe_modal";
import SuccessModal from "@/components/cores/success_modal/success_modal";
import Head from 'next/head';
import { updateVisit } from "apis/master-api";
import { ViSIT_ID } from "libs/const";
import SLayout from "@/components/layout/layout";

const HomePage = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const [isResultModalVisible, setIsResultModalVisible] = React.useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
    const [lang, setLang] = React.useState(null);
    const {t, i18n} = useTranslation();
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleResult = (isSuccess: boolean) => {
      if (isSuccess === true){
        setIsResultModalVisible(true);
      } else {
        setIsErrorModalVisible(true);
      }
      setTimeout(() => {
        setIsErrorModalVisible(false);
        setIsResultModalVisible(false);
      },1000);
      setIsModalVisible(false);
    }
    React.useEffect(() => {
      if (i18n && i18n.language){
        setLang(i18n.language);
      }
      updateVisit(ViSIT_ID).then(res => {
      }).catch(err => console.log(err));
    },[]);
    // const changeLanguage =  (lang: string) => (event) => {
    //   if (i18n){
    //     console.log(lang);
    //     i18n.changeLanguage(lang);
    //     setIsModalVisible(true);
    //   }
    // }
    return <SLayout>
              <div className = {styles.HomePage}>
            <Head>
                <title>So Cheap Online Shopping | Mua và Bán hàng hóa dễ dàng trực tuyến trên website và điện thoại | Trang Chủ | Home</title>
                <meta property="og:url" content="https://so-cheap.vercel.app/home"></meta>
                <meta property="og:site_name" content="So Cheap Online Shopping | Mua và Bán hàng hóa dễ dàng trực tuyến trên website và điện thoại | Trang Chủ | Home"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
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
                onResult = {handleResult}/>
            <SuccessModal
                  status = "success" 
                  visible = {isResultModalVisible} 
                  title = "Đăng ký thành công!" 
                  onCancel = {() => setIsResultModalVisible(false)} 
                  subTitle = {"Cảm ơn bạn đã đăng ký!"}/>
            <SuccessModal
                  status = "error" 
                  visible = {isErrorModalVisible}
                  afterClose = {() => setIsModalVisible(true)}
                  onCancel = {() => setIsErrorModalVisible(false)} 
                  title = "Đăng ký thất bại!" 
                  subTitle = {"Đăng ký thất bại rùi vui lòng đăng ký lại nhé!"}/>
        </div>
    </SLayout>

}

export default HomePage;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common','landing_page'])),
        // Will be passed to the page component as props
      },
    };
  }