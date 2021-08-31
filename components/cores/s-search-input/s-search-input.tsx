import { AutoComplete, Input, SelectProps } from "antd";
import { useState } from "react";
import styles from "./s-search-input.module.scss";
import classNames from "classnames";

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



const SSearchInput = (props: Props) => {
    const {className} = props;
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = (value: string) => {
        setTimeout(() => {
            setOptions(value ? searchResult(value) : []);
            setLoading(false);
        },4000);
        setLoading(true);
    };
  
    const onSelect = (value: string) => {
      console.log('onSelect', value);
    };

    return (
        <AutoComplete
          dropdownMatchSelectWidth={252}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          className = {classNames(className, styles.Search)}
        bordered
        >
          <Input.Search 
          size="large" 
          placeholder="Tìm bài viết"
          className = {styles.Input}
          loading = {loading} 
          enterButton bordered />
        </AutoComplete>
      );
}

export default SSearchInput;

type Props = {
    className?: string;
}