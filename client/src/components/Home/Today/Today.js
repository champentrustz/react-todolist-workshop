import React, {useEffect} from 'react';
import {Divider, Layout, List, Menu} from "antd";
import {Card, Row, Col, Alert, Button,Typography, Breadcrumb, Tag} from "antd";
import AddTaskButton from "../Task/AddTaskButton";
import {useDispatch, useSelector} from "react-redux";
import TaskForm from "../Task/TaskForm";
import {CANCEL_TASK_FORM_REQUEST, DELETE_PROJECT_REQUEST} from "../../../redux/types/todo.type";
import {MailOutlined, FieldTimeOutlined, PlusOutlined, ProfileOutlined, CloseOutlined, EditOutlined} from '@ant-design/icons';
import ShowTask from "../Task/ShowTask";


const {Content} = Layout;
const {Title, Text} = Typography;

function Today() {

    const todoReducer = useSelector(({todoReducer}) => todoReducer);
    const authReducer = useSelector(({authReducer})=>authReducer)
    const dispatch = useDispatch();
    const action = (type) => dispatch({type});

    const project = authReducer.userTask && authReducer.userTask.projects;


    useEffect(()=>{
        document.title = 'Today : Todo-List';
        action(CANCEL_TASK_FORM_REQUEST);

        },[])

    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May",
        "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const month = d.getMonth();
    const EngMonth= months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();
    const EngDay = days[d.getDay()];
    const showDate = EngDay +' '+ date + ' '+ EngMonth;
    const defaultPickDate = ('0' + date).slice(-2) + '/'
        + ('0' + (month+1)).slice(-2) + '/'
        + year;
    const defaultPickTime = d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes();

    return (


        <Layout style={{ marginLeft:20 }}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >
                <div >

                    <Title  level={4}>Today&nbsp;<span><Text className="show-date">({showDate})</Text></span></Title>


                </div>

                <Divider style={{margin:0,marginTop:20}}/>

                <ShowTask project={project} date={defaultPickDate}/>

                <Divider style={{margin:0,marginBottom:20}}/>
                {
                    todoReducer.isOpenTaskForm === false ? <AddTaskButton/>
                        : <TaskForm defaultPickDate={defaultPickDate} defaultPickTime={defaultPickTime}/>
                }

            </Content>
        </Layout>


    );
}

export default Today;