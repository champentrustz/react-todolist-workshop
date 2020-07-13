import React, {useEffect, useState} from 'react';
import './login.css';
import {Layout, Card, Form, Button, Input, Typography} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ON_LOGIN_REQUEST} from "../../redux/types/login.type";
import loginReducer from "../../redux/reducers/login.reducer";

const {Text} = Typography;
const {Content} = Layout;


function LoginPage() {


    const dispatch = useDispatch();
    const action = (type,payload)=>dispatch({type,payload});
    const loginReducer = useSelector(({loginReducer}) => loginReducer);


    // const onSubmit = values => {
    //     console.log('Received values of form: ', values);
    // };

    const {username} = loginReducer.userData;
    const token = loginReducer.token;

    return (

        <Content className="content-layout content-center">


            <Card style={{width: '550px'}} bordered={false}>

                {console.log(username)}
                {console.log(token)}

                <div className="content-center">


                    <img style={{width: '192px', height: '192px'}}
                         src={process.env.PUBLIC_URL + '/images/to-do-list.svg'} alt="logo"/>

                </div>
                <br/>
                <h1 style={{textAlign: 'center'}}><Text>Todo-list Workshop</Text></h1>
                <br/>
                <br/>
                <Form
                    onFinish={()=>action(ON_LOGIN_REQUEST)}
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Username"

                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                            ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"

                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        &nbsp;&nbsp;Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>

            </Card>




            {/*<Row gutter={[0,16]}>*/}
            {/*    {data.map((item,index) =>*/}
            {/*            <Col xs={24} sm={24} md={24} xl={24} key={index}>*/}
            {/*                <Card title="Card title" bordered={false}>*/}
            {/*                    test*/}
            {/*                </Card>*/}

            {/*            </Col>*/}
            {/*    )}*/}
            {/*</Row>*/}

        </Content>

    );
}

export default LoginPage;