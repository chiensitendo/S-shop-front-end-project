import { AutoComplete, Input, SelectProps } from "antd";
import { useState } from "react";
import styles from "./s-search-input-sp.module.scss";
import classNames from "classnames";
import { SearchOutlined } from "@ant-design/icons";
function getRandomInt(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });



const SSearchInputMobile = (props: Props) => {
    const {className} = props;
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [loading, setLoading] = useState(false);
    const [expand, setExpand] = useState(false);
    const handleSearch = (value: string) => {
      console.log("OK");
      if (expand === true){
        setTimeout(() => {
          setOptions(value ? searchResult(value) : []);
          setLoading(false);
        },4000);
        setLoading(true);
      }
    };
  
    const onSelect = (value: string) => {
      console.log('onSelect', value);
    };
    console.log(expand);
    return (
        <AutoComplete
          onClick = {(event) => {
            console.log(event.currentTarget.tagName);
            
          }}
          dropdownMatchSelectWidth={252}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          className = {classNames(className, styles.SearchMobile, {[styles.SearchMobileActive]: expand === true})}
        bordered
        >
          <Input.Search 
          size="large" 
          placeholder="Tìm bài viết"
          className = {classNames({[styles.Input_SP]: !expand, [styles.Input_SPActive]: expand})}
          loading = {loading} 
          enterButton = {<SearchOutlined onClick = {() => {
            setExpand(!expand);
          }} />} bordered  />
        </AutoComplete>
      );
}

export default SSearchInputMobile;

type Props = {
    className?: string;
}