import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Layout} from "antd";

const {Content} = Layout;

function Project() {
    let { id } = useParams();

    const authReducer = useSelector(({authReducer}) => authReducer);
    const project = authReducer.userTask &&
        authReducer.userTask[0].projects.filter(project => project._id === id);
    const tasks = project && project[0].tasks;


    return (
        <Layout style={{marginLeft: 20}}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,

                }}
            >
                test
                <h3>ID: {id}</h3>
                <h2>Project: {project && project[0].name}</h2>
                {tasks && tasks.map((task,index) =>
                    <li key={index}>{task.name}</li>
                )}
            </Content>
        </Layout>
    );
}

export default Project;