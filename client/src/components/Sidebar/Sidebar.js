import React, {useEffect, useState} from 'react';
import {Divider, Button, Typography, Form, Input, Layout, Menu, Modal} from 'antd';
import {MailOutlined, FieldTimeOutlined, PlusOutlined, ProfileOutlined} from '@ant-design/icons';
import './sidebar.css';

import {
    Link,
    useRouteMatch
} from "react-router-dom";
import {CANCEL_TASK_FORM_REQUEST} from "../../redux/types/todo.type";
import {useSelector} from "react-redux";

const {Sider} = Layout;
const {SubMenu} = Menu;
const {Text} = Typography;

function Sidebar() {

    const [visible, setVisible] = useState(false);
    let {path} = useRouteMatch();

    const onSubmit = values => {
        console.log(values);
    }

    const authReducer = useSelector(({authReducer}) => authReducer);
    const projects = authReducer.userTask && authReducer.userTask[0].projects;
    const [form] = Form.useForm();


    return (

        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            theme="light"
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={[path]}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0,}}
                selectedKeys={[path]}
            >
                <Menu.Item key="/inbox" icon={<MailOutlined/>}><Link to={'/inbox'}>Inbox</Link></Menu.Item>
                <Menu.Item key="/" icon={<FieldTimeOutlined/>}>
                    <Link to={'/'}>Today</Link>
                    &nbsp;

                </Menu.Item>
                <SubMenu key="sub1" icon={<ProfileOutlined/>} title="Projects">
                    {projects && projects.map((project, index) =>
                        project.type !== "INITIAL" &&
                        <Menu.Item key={index}>
                            <Link to={`/project/${project._id}`}>{project.name}</Link>
                        </Menu.Item>
                    )}

                    <Menu.Item key="4" icon={<PlusOutlined/>} onClick={()=>setVisible(true)}>Add Project

                    </Menu.Item>
                </SubMenu>



                <Modal
                    title="Add project"
                    width={400}
                    visible={visible}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                form.resetFields();
                                console.log(values);
                            })
                            .catch(() => {
                                console.log('Please input your task!');
                            });
                    }}
                    onCancel={()=>setVisible(false)}

                >
                    <Form
                        form={form}
                        name="todo-form"
                        onFinish={onSubmit}
                        scrollToFirstError
                    >
                            <Form.Item
                                name="project"
                                label="Project name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your task!',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                    </Form>
                </Modal>


            </Menu>


        </Sider>
    );

}

export default Sidebar;