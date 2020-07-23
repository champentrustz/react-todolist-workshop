import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Divider, Layout, Typography} from "antd";
import AddTaskButton from "../Task/AddTaskButton";
import TaskForm from "../Task/TaskForm";
import {CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";

const {Content} = Layout;
const {Title} = Typography;

function Project() {
    let { id } = useParams();

    const authReducer = useSelector(({authReducer}) => authReducer);
    const project = authReducer.userTask &&
        authReducer.userTask.projects.filter(project => project._id === id);
    const tasks = project && project[0].tasks;
    const todoReducer = useSelector(({todoReducer}) => todoReducer);
    const dispatch = useDispatch();
    const action = (type) => dispatch({type});


    useEffect(() => {
        document.title = 'Project : Todo-List';
        action(CANCEL_TASK_FORM_REQUEST);

    },[id]);

    return (
        <Layout style={{marginLeft: 20}}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >
                <h3>ID: {id}</h3>
                <Title style={{margin: 0}} level={4}>{project && project[0].name}</Title>
                <Divider/>
                {tasks && tasks.map((task,index) =>
                    <li key={index}>{task.name}</li>
                )}

                {
                    todoReducer.isOpenTaskForm === false ? <AddTaskButton/>
                        : <TaskForm defaultSelected={project[0].name}/>
                }
            </Content>
        </Layout>
    );
}

export default Project;