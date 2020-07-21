import React, {useEffect, useState} from 'react';
import {Badge, Button, Typography, Form, Input, Layout, Menu, Modal} from 'antd';
import {MailOutlined, FieldTimeOutlined, PlusOutlined, ProfileOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons';
import './sidebar.css';

import {
    Link,
    useRouteMatch
} from "react-router-dom";
import {ADD_PROJECT_REQUEST, CANCEL_TASK_FORM_REQUEST} from "../../redux/types/todo.type";
import {useDispatch, useSelector} from "react-redux";

const {Sider} = Layout;
const {SubMenu} = Menu;
const {Text} = Typography;

function Sidebar() {

    const [visible, setVisible] = useState(false);
    let {path} = useRouteMatch();
    const dispatch = useDispatch();
    const action = (type,payload) => dispatch({type,payload});


    const authReducer = useSelector(({authReducer}) => authReducer);
    const projects = authReducer.userTask && authReducer.userTask.projects;
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
                        <Menu.Item key={index} className="flex-menu-container">
                            <Link className="show-project" to={`/project/${project._id}`}>{project.name}</Link>
                            <Button className="button-delete"   icon={<CloseOutlined style={{margin:0}}/>}/>
                            <Button className="button-edit"  icon={<EditOutlined style={{margin:0}}/>}/>
                        </Menu.Item>
                    )}

                    <Menu.Item key="4" onClick={()=>setVisible(true)}><Button icon={<PlusOutlined/>}>Add Project</Button>

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
                                action(ADD_PROJECT_REQUEST,values);
                                setVisible(false);
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