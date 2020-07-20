import React, {useEffect, useState} from 'react';
import {Divider, Layout} from "antd";
import {Card, Row, Col, Alert, Button, Typography, Breadcrumb} from "antd";
import AddTaskButton from "../Task/AddTaskButton";
import TaskForm from "../Task/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";

const {Content} = Layout;
const {Title, Text} = Typography;

function Inbox() {

    const todoReducer = useSelector(({todoReducer}) => todoReducer);
    const dispatch = useDispatch();
    const action = (type) => dispatch({type});

    useEffect(() => {
        document.title = 'Inbox: Todo-List';
        action(CANCEL_TASK_FORM_REQUEST);
    }, []);


    return (


        <Layout style={{marginLeft: 20}}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >

                <Title style={{margin: 0}} level={4}>Inbox</Title>

                <Divider/>

                {
                    todoReducer.isOpenTaskForm === false ? <AddTaskButton/>
                        : <TaskForm/>
                }

            </Content>
        </Layout>


    );
}

export default Inbox;