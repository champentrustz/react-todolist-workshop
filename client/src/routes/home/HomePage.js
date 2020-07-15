import React, {useEffect} from 'react';
import {Card, Layout, Row, Col, Alert, Button,Typography} from "antd";
import './home.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const {Content} = Layout;
const {Title} = Typography;

function HomePage() {

   const authReducer = useSelector(({authReducer}) => authReducer);
   const isAuthenticated = authReducer.isAuthenticated;


    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        }

    ];

    return (
        <Content className="content-layout">



            <div className="flex-container">
                <div className="side-menu">Side-bar</div>
                <div className="content-todo"> <Title level={3}>Todo-Home</Title></div>

            </div>

            {/* <Row gutter={[0,16]}>*/}
            {/*    {data.map((item,index) =>*/}
            {/*        <Col xs={24} sm={24} md={24} xl={24} key={index}>*/}
            {/*            <Card title="Card title" bordered={false}>*/}
            {/*                test*/}
            {/*            </Card>*/}

            {/*        </Col>*/}
            {/*    )}*/}
            {/*</Row>*/}



        </Content>
    );
}

export default HomePage;