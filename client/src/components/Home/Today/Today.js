import React, {useEffect} from 'react';
import {Divider, Layout} from "antd";
import {Card, Row, Col, Alert, Button,Typography, Breadcrumb} from "antd";
import AddTask from "./AddTask";
import {useSelector} from "react-redux";
import TaskForm from "./TaskForm";

const {Content} = Layout;
const {Title, Text} = Typography;

function Today() {

    const todoReducer = useSelector(({todoReducer}) => todoReducer);

    useEffect(()=>{
        document.title = 'today';
    },[])

    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May",
        "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const day = days[d.getDay()];
    const showDate = day +' '+ date + ' '+ month;


    return (


        <Layout style={{ marginLeft:20 }}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >
                <div className="flex-container">

                    <Title  level={4}>Today&nbsp;</Title>
                    <Text className="show-date">({showDate})</Text>


                </div>
                <Divider />
                {
                    todoReducer.isOpenTaskForm === false ? <AddTask/>
                        : <TaskForm/>
                }

            </Content>
        </Layout>


    );
}

export default Today;