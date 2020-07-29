import React from 'react';
import { List, Tag, Typography, Empty} from "antd";
import './index.css';
import {
    Link,
} from "react-router-dom";


const {Text} = Typography;

function ShowTask(props) {


    return (


    props.project &&
        <List

            itemLayout="horizontal"
            dataSource={props.project}
            renderItem={project =>

                project.tasks.length !== 0 ? project.tasks.map(task =>

                        props.date ?
                            props.date === task.date &&
                            <List.Item
                                actions={[
                                    <Tag >
                                        <Link className="show-project" to={`/project/${project._id}`}>#{project.name}</Link>
                                    </Tag>,
                                    <a>edit</a>,
                                    <a><Text type="danger">delete</Text></a>,
                                ]}
                            >
                                {
                                    (task.date !== 'undefined' || task.time !== 'undefined') ?
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
                                    <a>edit</a>,
                                    <a><Text type="danger">delete</Text></a>,
                                ]}
                            >
                                {
                                    (task.date !== 'undefined' || task.time !== 'undefined') ?
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
                    ) : <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"No Task Available"}
                />

            }
        />


    );
}

export default ShowTask;