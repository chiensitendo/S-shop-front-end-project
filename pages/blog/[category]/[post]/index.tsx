import DefaultButton from "@/components/cores/default_button/default_button";
import SInput from "@/components/cores/s-input/s-input";
import SLayout from "@/components/layout/layout";
import { ArrowLeftOutlined, ArrowRightOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Card, Divider, Form, Input, List, Rate } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";
import { FULL_DATETIME_FORMAT } from "libs/const";
import { RULE_TYPE } from "libs/types";
import { capitalizeFirstLetter, createRules } from "libs/ultility";
import moment from "moment";
import { NextRouter, useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styles from "./post.module.scss";

const postItem: Post = {
        title: "Los Angeles",
        description: "Los Angeles battles huge wildfires.",
        category: "Food",
        datetime: "2021-11-09 11:00:00",
        id: 2,
        image: "https://images.huffingtonpost.com/2016-06-28-1467153097-7249060-Blogpost.jpg",
        content: "<h2>This is content.</h2>",
        nextPostId: 3,
        nextPostTitle: "Next Post Title",
        previousPostId: 1,
        previousPostTitle: "Previous Post Title",
        tags: ["Food", "Design"],
        rating: 2.5
    }
const commentData: Comment[] = [
    {
        id: 1,
        userId: 1,
        content: "This is a good article",
        name: "Jame Pone",
        avatar: "",
        datetime: "2021-11-09 11:00:00",
    },
    {
        id: 2,
        userId: 2,
        content: "Yes I think so!",
        name: "Nicky Mayya",
        avatar: "",
        datetime: "2021-11-09 11:00:00",
    },
    {
        id: 3,
        userId: 3,
        content: "úc 8h ngày 17/8, sáu tấm barie được đặt dọc theo chiều xe di chuyển, chia một bên đường Nguyễn Chí Thanh thành hai làn. Hai cảnh sát giao thông đứng ở đầu chốt phân luồng phương tiện đi thẳng và luồng xe vào khu vực kiểm tra. Hơn 10 cảnh sát đứng cách nhau hơn 2 m xem xét giấy đi đường của người dân.",
        name: "Smith",
        avatar: "",
        datetime: "2021-11-09 11:00:00",
    }
  
]
const BlogPostPage = () => {
    const [host, setHost] = useState("");
    const [form] = Form.useForm();
    const [postName, setPostName] = useState("");
    const [rating, setRating] = useState(postItem.rating);
    const [comments, setComments] = React.useState<Comment[]>(commentData);
    const router: NextRouter = useRouter();
    const { category, post } = router.query;
    const commentListRef = useRef(null);
    const categoryId: string = React.useMemo(() => {
        if (!category){
            return "";
        }
        return category + "";
    },[category]);

    React.useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setHost(window.location.protocol + "//" + window.location.host);
        } else {
            setHost(window.location.protocol + "//" + window.location.hostname);
        }   
    });
    React.useEffect(() => {
        if (post){
            let p = post + "";
            let a = p.split("-_");
            if (a.length < 2){
                router.push("/error");
                return;
            } else if (!a[0] || isNaN(+a[0])) {
                router.push("/error");
                return;
            } else if (!a[1]){
                router.push("/error");
                return;                
            }
            let name = a[1].replace("-", " ");
            setPostName(name);
            console.log("OK");
        }
    },[post]);

    const time = moment(postItem.datetime, FULL_DATETIME_FORMAT).locale("vi").format("LLL");

    const onFinish = (values: any) => {
        console.log(values);
        let comment: Comment = {
            id: comments.length,
            content: values.comment,
            name: values.name,
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            userId: 1,
            datetime: moment().locale("vi").format(FULL_DATETIME_FORMAT)
        }
        setComments([...comments,comment]);
        form.resetFields();
        setTimeout(() => {
            commentListRef.current.scroll({
                left: 0,
                top: 500
            })
        },200);
    };
    const onFinishFailed = (errorInfo: any) => {
    };
    const handleRating = () => {
        if (rating === null){
            return;
        }
        form.validateFields(["name", "email"]);
        console.log(rating);
    }
    const onRelatedPost = (id: number, title: string) => (e) => {
        if ( !id && !title){
            return;
        }
        let t = title.toLowerCase().replace(" ", "-");
        router.push("/blog/" + categoryId.toLowerCase() + "/" +id + "-_" + t);
    }
    return <SLayout>
    <div className = {styles.BlogPage}>
        <div className = {styles.BlogHeader}>
            <h1><a href = {host + "/blog/" + categoryId}><ArrowLeftOutlined /></a>{postName.toUpperCase()}</h1>
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
                    /
                    <li property="itemListElement" typeof="ListItem">
                        <a property="item" typeof="WebPage"
                            href={host + "/blog/" + categoryId}>
                        <span property="name">{capitalizeFirstLetter(categoryId)}</span></a>
                        <meta property="position" content="3"/>
                    </li>
                    /
                    <li property="itemListElement" typeof="ListItem">
                        <a property="item" typeof="WebPage"
                            href={host + "/blog/" + categoryId + "/" + post}>
                        <span property="name">{capitalizeFirstLetter(postName)}</span></a>
                        <meta property="position" content="4"/>
                    </li>
                </ol>
            </div>
        </div>
        {postItem && <div className = {styles.PostContent}>
            <div className = {styles.PostImage}>
                <img src = {postItem.image} alt = {postItem.description}/>
            </div>
            <div className = {styles.PostContainer}>
                <Card
                    hoverable
                >
                    <p className = {styles.subNote}>{postItem.category.toLocaleUpperCase()} - {time.toLocaleUpperCase()}</p>
                    <Meta title={<div className = {styles.PostTitle}><h1>{postItem.title}</h1><Rate allowHalf defaultValue={postItem.rating} disabled /></div>} 
                    description={<div dangerouslySetInnerHTML = {{__html: postItem.content}}></div>} />
                    <div className = {styles.Tags}>
                        {postItem.tags.map((tag, index) => {
                            return <p key = {index}>{tag}</p>
                        })}
                    </div>
                    <Divider/>
                    <div className = {styles.relatedPost}>
                        <div className = {styles.previous}>
                            {postItem.previousPostId && <p>PREVIOUS POST</p>}
                            {postItem.previousPostId && <p onClick = {onRelatedPost(postItem.previousPostId, postItem.previousPostTitle)}><ArrowLeftOutlined />{postItem.previousPostTitle}<LeftCircleOutlined className = {styles.icon} /></p>}
                        </div>
                        <div  className = {styles.next}>
                            {postItem.nextPostId && <p>NEXT POST</p>}
                            {postItem.nextPostId && <p onClick = {onRelatedPost(postItem.nextPostId, postItem.nextPostTitle)}>{postItem.nextPostTitle}<ArrowRightOutlined /><RightCircleOutlined className = {styles.icon} /></p>}
                        </div>
                    </div>
                    <Divider/>
                    <div className = {styles.CommentList} ref = {commentListRef}>
                    <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={comment => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{comment.name}</a>}
                            description={<div className = {styles.description}><p>{comment.content}</p><span>{comment.datetime}</span></div>}
                            />
                            
                        </List.Item>
                        )}
                    />
                    </div>
                    <Divider/>
                    <div className = {styles.Rating}>
                        <h2>Rate this post ?</h2>
                        <Rate allowHalf allowClear = {false} defaultValue={postItem.rating} onChange = {(event) => {
                            setRating(+event);
                        }} />
                        <DefaultButton onClick= {handleRating}>Rating</DefaultButton>
                    </div>
                    <Divider/>
                    <div className = {styles.Comment}>
                        <h2>Leave a comment</h2>
                        <Form 
                                name="commentform"
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                form={form}
                            >
                                <Form.Item name = "comment" rules={createRules("comment", [RULE_TYPE.REQUIRED])}><TextArea rows = {5} placeholder = "Comment"></TextArea></Form.Item>
                                <div className = {styles.Info}>
                                    <SInput name = "name" rules={createRules("name", [RULE_TYPE.REQUIRED])}><Input placeholder = "Name"/></SInput>
                                    <SInput name = "email" rules={createRules("email", [RULE_TYPE.REQUIRED, RULE_TYPE.EMAIL])}><Input placeholder = "Email"/></SInput>
                                </div>
                                <Form.Item>
                                    <DefaultButton className = {styles.submitButton} htmlType = "submit">Submit</DefaultButton>
                                </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>}
    </div>
    </SLayout>
}

export default BlogPostPage;

type Post = {
    title: string;
    description: string;
    category: string;
    datetime: string;
    image: string;
    id: number;
    content: string;
    previousPostId?: number;
    previousPostTitle?: string;
    nextPostId?: number;
    nextPostTitle?: string;
    tags?: string[];
    rating: number;
}
type Comment = {
    id: number;
    userId?: number;
    name: string;
    content: string;
    avatar?: string;
    datetime?: string;
}