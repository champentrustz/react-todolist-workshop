import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Divider, Layout, Empty, Typography,} from "antd";
import AddTaskButton from "../Task/AddTaskButton";
import TaskForm from "../Task/TaskForm";
import {CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";
import ShowTask from "../Task/ShowTask";

const {Content} = Layout;
const {Title} = Typography;

function Project() {
    let { id } = useParams();

    const authReducer = useSelector(({authReducer}) => authReducer);
    const project = authReducer.userTask &&
        authReducer.userTask.projects.filter(project => project._id === id);
    const todoReducer = useSelector(({todoReducer}) => todoReducer);
    const dispatch = useDispatch();
    const action = useCallback((type) =>{
        dispatch({type});
    },[dispatch])

    let isTaskAvailable = false;

    project && project.map(project =>{
        if(project.tasks.length !== 0){
            isTaskAvailable = true
        }
        return null;
    })




    useEffect(() => {
        document.title = 'Project : Todo-List';
        action(CANCEL_TASK_FORM_REQUEST);

    },[id, action]);


    return (

        <Layout style={{marginLeft: 20}}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >
                {
                    project && project.length !== 0 ? <div>
                    <Title style={{margin: 0}} level={4}>
                        {project && project[0].name}
                    </Title>
                    <Divider style={{margin: 0, marginTop: 20}}/>

                    <ShowTask project={project} isTaskAvailable={isTaskAvailable}/>

                    <Divider style={{margin: 0, marginBottom: 20}}/>

                {
                    todoReducer.isOpenTaskForm === false ? <AddTaskButton/>
                    : <TaskForm defaultSelected={id}/>
                }
                    </div>
                :
                        <div>
                        <Divider style={{margin: 0, marginTop: 20}}/>
                        <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"No Project Available"}
                    />
                    <Divider style={{margin: 0, marginTop: 20}}/>
                        </div>
                }
            </Content>
        </Layout>

    );
}

export default Project;