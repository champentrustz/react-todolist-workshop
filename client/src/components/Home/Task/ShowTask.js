import React from 'react';
import { List, Tag, Typography, Empty, Button} from "antd";
import './index.css';
import {
    Link,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_TASK_REQUEST, OPEN_EDIT_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";
import TaskForm from "./TaskForm";


const {Text} = Typography;



function ShowTask(props) {

    const dispatch = useDispatch();
    const action = (type,payload) => dispatch({type,payload});
    const todoReducer = useSelector(({todoReducer})=>todoReducer)

    const project = props.project;



    return (

        props.isTaskAvailable === true ?
        <List
            itemLayout="horizontal"
            dataSource={project ? project : []}
            renderItem={project =>


                project.tasks.length !== 0 &&  project.tasks.map(task =>



                    (todoReducer.isOpenEditTaskForm === true && todoReducer.editTaskID === task._id)  ?



                        task.date && task.date !== 'undefined'  ?

                        <TaskForm defaultTaskName={task.name}
                                  defaultPickDate={task.date}
                                  defaultPickTime={task.time}
                                  defaultSelected={project._id}
                        /> : <TaskForm defaultTaskName={task.name}
                                       defaultSelected={project._id}
                            />
                        :

                        props.date ?
                            props.date === task.date &&



                            <List.Item
                                actions={[
                                    <Tag >
                                        <Link className="show-project" to={`/project/${project._id}`}>#{project.name}</Link>
                                    </Tag>,
                                    <Button type="text" onClick={()=> action(OPEN_EDIT_TASK_FORM_REQUEST,task._id)}>edit</Button>,
                                    <Button type="text" onClick={()=> action(DELETE_TASK_REQUEST,task._id)}><Text type="danger">delete</Text></Button>,
                                ]}
                            >

                                {
                                    task.date && task.date !== 'undefined'  ?
                                        <List.Item.Meta
                                            className="text-newline"
                                            title={task.name}
                                            description={
                                                task.date + ' ' + task.time
                                            }
                                        /> :
                                        <List.Item.Meta
                                            className="text-newline"
                                            title={<Text>{task.name}</Text>}
                                        />


                                }

                                {/*<div>content</div>*/}
                            </List.Item> :
                            <List.Item
                                actions={[
                                    <Button type="text" onClick={()=> action(OPEN_EDIT_TASK_FORM_REQUEST,task._id)}>edit</Button>,
                                    <Button type="text" onClick={()=> action(DELETE_TASK_REQUEST,task._id)}><Text type="danger">delete</Text></Button>,
                                ]}
                            >
                                {
                                    task.date && task.date !== 'undefined'  ?
                                        <List.Item.Meta
                                            className="text-newline"
                                            title={<Text>{task.name}</Text>}
                                            description={
                                                task.date + ' ' + task.time}
                                        /> :
                                        <List.Item.Meta
                                            className="text-newline"
                                            title={<Text>{task.name}</Text>}
                                        />


                                }


                                {/*<div>content</div>*/}

                            </List.Item>

                    )

            }
        /> :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'No Task Available'}
            />
    );



}


export default ShowTask;