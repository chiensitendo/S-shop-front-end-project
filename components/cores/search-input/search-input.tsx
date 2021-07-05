import styles from "./search-input.module.scss";
import classNames from "classnames";
import Search from "antd/lib/input/Search";

const SearchInput = (props: Props) => {
    const {className, isLoading, placeholder, enterButton, onClick} = props;
    return <div className = {classNames(styles.SearchInput, className)}>
        <Search 
        placeholder= {placeholder} 
        enterButton= {enterButton} 
        size="large" 
        loading = {isLoading}
        onClick = {onClick && onClick}
        />
    </div>
}

export default SearchInput;

type Props = {
    className?: string;
    isLoading?: boolean;
    placeholder?: string;
    enterButton?: string;
    onClick?: () => void
}