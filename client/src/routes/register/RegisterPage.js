import React, {useEffect} from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    Card,
    Breadcrumb,
    Alert,
} from 'antd';

import './register.css';
import {Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_REGISTER_REQUEST, REGISTER_REQUEST} from "../../redux/types/register.type";

const {Content} = Layout;


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


function RegisterPage() {

    const dispatch = useDispatch();
    const action = (type, payload) => dispatch({type, payload});
    const authReducer = useSelector(({authReducer}) => authReducer);

    const isRegistered = authReducer.isRegistered;


    let history = useHistory();

    useEffect(()=>{
        if(isRegistered === true){
            history.push("/");
        }
    },[isRegistered,history]);

    const onSubmit = values => {
        action(REGISTER_REQUEST,values);
    };

    return (


        <Content className="content-layout content-center">


            <div style={{display: 'flex', flexDirection: 'column', width: '550px'}}>


                {isRegistered === false ?
                    <Alert message="Username is already exist" type="error" showIcon /> : null

                }

                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>
                        <Link to="/login">Login</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Register
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Card bordered={false}>
                    <h1 style={{textAlign: 'center'}}>Register</h1>
                    <br/>
                    <Form
                        {...formItemLayout}
                        name="register"
                        onFinish={onSubmit}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min : 4,
                                    message:  'Password length are at least 4',
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {

                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>
                        </Form.Item>


                        <Form.Item {...tailFormItemLayout}>
                            {isRegistered === true ?
                                <Button type="primary" htmlType="submit" loading>
                                    Register
                                </Button>
                                :  <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            }
                        </Form.Item>
                    </Form>
                </Card>
            </div>

        </Content>


    );
}


export default RegisterPage;