import React, {useEffect, useState} from 'react';
import './login.css';
import {Layout, Card, Form, Button, Input, Typography, Alert} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_REQUEST, ON_LOGIN_REQUEST} from "../../redux/types/login.type";
import {CANCEL_TASK_FORM_REQUEST} from "../../redux/types/todo.type";

const {Text} = Typography;
const {Content} = Layout;


function LoginPage() {


    const dispatch = useDispatch();
    const action = (type,payload)=>dispatch({type,payload});
    const authReducer = useSelector(({authReducer}) => authReducer);
    const isLogin = authReducer.isLogin
    let history = useHistory();

    const onSubmit = values => {
         action(LOGIN_REQUEST,values)
    };

    useEffect(()=>{
        if(isLogin === true){
            history.push("/");
        }
        document.title = 'Login : Todo-List';
    },[isLogin]);



    return (

        <Content className="content-layout content-center">

            <div style={{display: 'flex', flexDirection: 'column', width: '550px'}}>


            <Card bordered={false}>


                <div className="content-center">


                    <img style={{width: '192px', height: '192px'}}
                         src={process.env.PUBLIC_URL + '/images/to-do-list.svg'} alt="logo"/>

                </div>
                <br/>
                <h1 style={{textAlign: 'center'}}><Text>Todo-list Workshop</Text></h1>
                <br/>
                {isLogin === false ?
                    <Alert message="Wrong username or password" type="error" showIcon /> : null
                }
                <br/>
                <Form
                    onFinish={onSubmit}
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
            {/*    {data.map((item,inbox) =>*/}
            {/*            <Col xs={24} sm={24} md={24} xl={24} key={inbox}>*/}
            {/*                <Card title="Card title" bordered={false}>*/}
            {/*                    test*/}
            {/*                </Card>*/}

            {/*            </Col>*/}
            {/*    )}*/}
            {/*</Row>*/}
            </div>

        </Content>

    );
}

export default LoginPage;