import React, {useEffect} from 'react';
import {Card, Layout, Row, Col, Alert, Button} from "antd";
import './home.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const {Content} = Layout;

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

             <Row gutter={[0,16]}>
                {data.map((item,index) =>
                    <Col xs={24} sm={24} md={24} xl={24} key={index}>
                        <Card title="Card title" bordered={false}>
                            test
                        </Card>

                    </Col>
                )}
            </Row>



        </Content>
    );
}

export default HomePage;