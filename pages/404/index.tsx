import styles from "./404.module.scss";

const PageNotFound = () => {
    return <div className = {styles.PageNotFound}>
        <img src = "/assets/images/page_not_found.svg" alt = "SoCheap | Page Not Found"/>
    </div>
}

export default PageNotFound;