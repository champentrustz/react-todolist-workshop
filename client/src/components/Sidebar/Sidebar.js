import React, {useEffect, useState} from 'react';
import {Badge, Button, Typography, Form, Input, Layout, Menu, Modal} from 'antd';
import {MailOutlined, FieldTimeOutlined, PlusOutlined, ProfileOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons';
import './sidebar.css';

import {
    Link,
    useRouteMatch
} from "react-router-dom";
import {
    ADD_PROJECT_REQUEST,
    CANCEL_TASK_FORM_REQUEST,
    DELETE_PROJECT_REQUEST,
    EDIT_PROJECT_REQUEST
} from "../../redux/types/todo.type";
import {useDispatch, useSelector} from "react-redux";

const {Sider} = Layout;
const {SubMenu} = Menu;
const {Text} = Typography;

function Sidebar() {

    const initialEditProject = {visible:false, project: {}};
    const [addProjectModalVisible, setAddProjectModalVisible] = useState(false);
    const [editProjectModalVisible, setEditProjectModalVisible] = useState(initialEditProject);
    let {path} = useRouteMatch();
    const dispatch = useDispatch();
    const action = (type,payload) => dispatch({type,payload});


    const authReducer = useSelector(({authReducer}) => authReducer);
    const projects = authReducer.userTask && authReducer.userTask.projects;
    const [formAdd] = Form.useForm();
    const [formEdit] = Form.useForm();


    useEffect(()=>{
        formEdit.setFieldsValue({project : editProjectModalVisible.project.name})
    },[editProjectModalVisible])


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
                            <Button onClick={()=>action(DELETE_PROJECT_REQUEST,project._id)} className="button-delete"   icon={<CloseOutlined style={{margin:0}}/>}/>
                            <Button onClick={()=>setEditProjectModalVisible({...initialEditProject, visible: true,project: project})} className="button-edit"  icon={<EditOutlined style={{margin:0}}/>}/>
                        </Menu.Item>
                    )}

                    <Menu.Item key="4" onClick={()=>setAddProjectModalVisible(true)}><Button icon={<PlusOutlined/>}>Add Project</Button>

                    </Menu.Item>
                </SubMenu>



                <Modal
                    name="add-project-modal"
                    title="Add project"
                    width={400}
                    forceRender
                    visible={addProjectModalVisible}
                    onOk={() => {
                        formAdd
                            .validateFields()
                            .then(values => {
                                action(ADD_PROJECT_REQUEST,values);
                                formAdd.resetFields();
                                setAddProjectModalVisible(false);
                            })
                            .catch(() => {
                                console.log('Please input your task!');
                            });
                    }}
                    onCancel={()=>{
                        setAddProjectModalVisible(false)}}

                >
                    <Form
                        form={formAdd}
                        name="add-project-form"
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

                <Modal
                    name="edit-project-modal"
                    title="Edit project"
                    width={400}
                    forceRender
                    visible={editProjectModalVisible.visible}
                    onOk={() => {
                        formEdit
                            .validateFields()
                            .then(values => {
                                action(EDIT_PROJECT_REQUEST, {
                                    project : values.project,
                                    id : editProjectModalVisible.project._id
                                });
                                setEditProjectModalVisible({...initialEditProject,visible: false});
                            })
                            .catch(() => {
                                console.log('Please input your task!');
                            });
                    }}
                    onCancel={()=>{
                        setEditProjectModalVisible({...initialEditProject,visible:false})
                    }}

                >
                    <Form
                        form={formEdit}
                        initialValues={{ project: editProjectModalVisible.project.name}}
                        name="edit-project-form"
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

                            < Input/>
                        </Form.Item>


                    </Form>
                </Modal>


            </Menu>


        </Sider>
    );

}

export default Sidebar;