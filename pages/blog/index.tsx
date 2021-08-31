import styles from "./blog.module.scss";
import SLayout from "@/components/layout/layout";
import SSearchInput from "@/components/cores/s-search-input/s-search-input";
import { Card, Collapse, Divider, List, Rate } from "antd";
import React, { useState } from "react";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { BlogCategories, FULL_DATETIME_FORMAT } from "libs/const";
import { ArrowRightOutlined } from "@ant-design/icons";
import { NextRouter, useRouter } from "next/router";
const BlogPage = (props) => {
    const [host, setHost] = useState("");
    const router: NextRouter = useRouter();
    React.useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setHost(window.location.protocol + "//" + window.location.host);
        } else {
            setHost(window.location.protocol + "//" + window.location.hostname);
        }
        
    })
    const data: TopPost[] = [
        {
            category: "Food",
            datetime: "2021-11-08 11:00:00",
            description: "Racing car sprays burning fuel into crowd.",
            title: "Racing car spray",
            index: 1,
            id: 1
        },
        {
            category: "Food",
            datetime: "2021-11-08 11:00:00",
            description: "Japanese princess to wed commoner.",
            title: "Japanese princess",
            index: 2,
            id: 2
        },
        {
            category: "Feeling",
            datetime: "2021-11-08 11:00:00",
            description: "Australian walks 100km after outback crash.",
            title: "Australian",
            index: 3,
            id: 3
        },
        {
            category: "Food",
            datetime: "2021-11-08 11:00:00",
            description: "Man charged over missing wedding girl.",
            title: "Man charged",
            index: 4,
            id: 4
        },
        {
            category: "Bussiness",
            datetime: "2021-11-08 11:00:00",
            description: "Los Angeles battles huge wildfires.",
            title: "Los Angeles",
            index: 5,
            id: 5
        }
    ];



    const posts: TitlePost[] = [
        {
            title: "Los Angeles",
            description: "Los Angeles battles huge wildfires.",
            category: "Food",
            datetime: "2021-11-09 11:00:00",
            id: 1,
            image: "https://images.huffingtonpost.com/2016-06-28-1467153097-7249060-Blogpost.jpg",
            rating: 2.5
        },
        {
            title: "Los Angeles",
            description: "Los Angeles battles huge wildfires.",
            category: "Food",
            datetime: "2021-11-09 11:00:00",
            id: 2,
            image: "https://images.huffingtonpost.com/2016-06-28-1467153097-7249060-Blogpost.jpg",
            rating: 3
        },        
    ]

    const onCategory = (category: string) => (e) => {
        router.push("/blog/" + category.toLocaleLowerCase());
    }
    const onTopPost = (post: TopPost) => (e) => {
        if (!post && !post.id && !post.title){
            return;
        }
        let title = post.title.toLowerCase().replace(" ", "-");
        router.push("/blog/" + post.category.toLowerCase() + "/" +post.id + "-_" + title);
    }
    const onPost = (post: TitlePost) => (e) => {
        if (!post && !post.id && !post.title){
            return;
        }
        let title = post.title.toLowerCase().replace(" ", "-");
        router.push("/blog/" + post.category.toLowerCase() + "/" +post.id + "-_" + title);
    }
    return <SLayout>
        <div className = {styles.BlogPage}>
            <div className = {styles.BlogHeader}>
                <h1>Blog</h1>
                <div className = {styles.breadcrumb}>
                    <ol vocab="http://schema.org/" typeof="BreadcrumbList">
                        <li property="itemListElement" typeof="ListItem">
                            <a property="item" typeof="WebPage"
                                href={host + "/"}>
                            <span property="name">Home</span></a>
                            <meta property="position" content="1"/>
                        </li>
                        /
                        <li property="itemListElement" typeof="ListItem">
                            <a property="item" typeof="WebPage"
                                href={host + "/blog"}>
                            <span property="name">Blog</span></a>
                            <meta property="position" content="2"/>
                        </li>
                    </ol>
                </div>
            </div>
            <div className = {styles.content}>
                <div className = {styles.list}>
                    {posts.map((post, index) => {
                        const time = moment(post.datetime, FULL_DATETIME_FORMAT).locale("vi").format("LLL");
                        return <div className = {styles.item} key = {index}>
                            <Card
                                hoverable
                                cover={<img alt={post.title} src={post.image}/>}
                                onClick = {onPost(post)}
                            >
                                <p className = {styles.category}>{post.category.toLocaleUpperCase()} - {time.toLocaleUpperCase()}</p>
                                <Meta title={<h1>{post.title}</h1>} description={<h2>{post.description}</h2>} />
                                <Rate className = {styles.Rating} allowHalf defaultValue={post.rating} disabled />
                                <p className = {styles.detail}>More Detail <ArrowRightOutlined /></p>
                            </Card>

                        </div>
                    })}
                </div>
            </div>
            <div className = {styles.menu}>
                <div>
                    <SSearchInput className = {styles.SearchInput}/>
                    <List
                        className = {styles.Categories}
                        size="large"
                        header={<div><h2>CATEGORIES</h2></div>}
                        bordered
                        dataSource={BlogCategories}
                        renderItem={item => <List.Item className = {styles.Item} onClick = {onCategory(item)}>{item}</List.Item>}
                    />
                    <Collapse className = {styles.CategoriesCollapse} defaultActiveKey={['1']}>
                        <Collapse.Panel header={<h2>CATEGORIES</h2>} key="1">
                            <List                        
                            size="small"
                            dataSource={BlogCategories}
                            renderItem={item => <List.Item className = {styles.Item} onClick = {onCategory(item)}>{item}</List.Item>}
                            />
                        </Collapse.Panel>
                    </Collapse>
                    <List
                        className = {styles.TopPost}
                        size="default"
                        header={<div className = {styles.ListHeader}><h2>TOP POSTS</h2></div>}
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item className = {styles.Item} onClick ={onTopPost(item)}>
                            <List.Item.Meta
                                avatar = {<h2>{item.index}</h2>} 
                                title = {item.title}
                                description = {<div className = {styles.Description}>
                                    <p>{item.description}</p>
                                    <p><span>{item.category}</span><span>{item.datetime}</span></p>
                                </div>}/>
                        </List.Item>}
                />
                <Divider/>
                </div>
            </div>
            
        </div>
    </SLayout>
}


export default BlogPage;

type TopPost = {
    title: string;
    description: string;
    category: string;
    datetime: string;
    index: number;
    id: number;
}

type TitlePost = {
    title: string;
    description: string;
    category: string;
    datetime: string;
    image: string;
    id: number;
    rating: number;
}