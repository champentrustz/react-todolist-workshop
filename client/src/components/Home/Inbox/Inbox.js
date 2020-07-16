import React, {useEffect, useState} from 'react';
import {Divider, Layout} from "antd";
import {Card, Row, Col, Alert, Button,Typography, Breadcrumb} from "antd";

const {Content} = Layout;
const {Title, Text} = Typography;

function Inbox() {


    useEffect(()=>{
        document.title = 'inbox';
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


        <Layout style={{ padding: '0 0 0 24px' }}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >

                    <Title  level={4}>Inbox</Title>

                <Divider />

            </Content>
        </Layout>


    );
}

export default Inbox;