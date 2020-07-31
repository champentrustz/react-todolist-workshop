import React, {useCallback, useEffect} from 'react';
import {Divider, Layout} from "antd";
import {Typography} from "antd";
import AddTaskButton from "../Task/AddTaskButton";
import TaskForm from "../Task/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";
import ShowTask from "../Task/ShowTask";

const {Content} = Layout;
const {Title} = Typography;

function Inbox() {

    const todoReducer = useSelector(({todoReducer}) => todoReducer);
    const authReducer = useSelector(({authReducer})=>authReducer)
    const dispatch = useDispatch();

    const action = useCallback((type) =>{
        dispatch({type});
    },[dispatch])

    let isTaskAvailable = false;

    const project = authReducer.userTask && authReducer.userTask.projects.filter(project => project.type === 'INITIAL')


    project && project.map(project =>{
        if(project.tasks.length !== 0){
            isTaskAvailable = true;
        }
        return null;
    })



    useEffect(() => {

        document.title = 'Inbox : Todo-List';
        action(CANCEL_TASK_FORM_REQUEST);
    }, [action]);




    return (


        <Layout style={{marginLeft: 20}}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >

                <Title style={{margin: 0}} level={4}>Inbox</Title>
                <Divider style={{margin:0,marginTop:20}}/>

                <ShowTask project={project} isTaskAvailable={isTaskAvailable}/>

                <Divider style={{margin:0,marginBottom:20}}/>

                {
                    todoReducer.isOpenTaskForm === false ? <AddTaskButton/>
                        : <TaskForm/>
                }

            </Content>
        </Layout>


    );
}

export default Inbox;