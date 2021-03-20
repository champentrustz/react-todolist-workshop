import React, { useState} from 'react';
import {Form, Input, Button, Card, DatePicker, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {ADD_TASK_REQUEST, CANCEL_TASK_FORM_REQUEST, EDIT_TASK_REQUEST} from "../../../redux/types/todo.type";
import moment from 'moment';

const {Option} = Select;


function TaskForm(props) {



    const {defaultTaskName} = props;
    const {defaultPickDate} = props;
    const {defaultPickTime} = props;



    const dispatch = useDispatch();
    const action = (type,payload) => dispatch({type,payload});
    const authReducer = useSelector(({authReducer})=>authReducer)
    const todoReducer = useSelector(({todoReducer})=>todoReducer)
    const [dateTime,setDateTime] = useState(defaultPickDate+' '+defaultPickTime);

    const projects = authReducer.userTask && authReducer.userTask.projects;

    const initialProjectSelected = projects && projects.filter(project=> project.type === 'INITIAL');

    const defaultSelected =  props.defaultSelected ? props.defaultSelected : initialProjectSelected[0]._id;
    const [projectID,setProjectID] = useState(defaultSelected);

    const onSubmit = values => {

        const dateTimeArray = dateTime && dateTime.split(' ');
        const date = dateTimeArray && dateTimeArray[0];
        const time = dateTimeArray && dateTimeArray[1];

        if(todoReducer.isOpenTaskForm === true){
            const payload = {
                task : values.todo,
                date : date,
                time : time,
                id : projectID
            }
            action(ADD_TASK_REQUEST, payload);
            action(CANCEL_TASK_FORM_REQUEST);
        }
        if(todoReducer.isOpenEditTaskForm === true){
            const payload = {
                task : values.todo,
                date : date,
                time : time,
                taskID : todoReducer.editTaskID,
                projectID : projectID
            }
            action(EDIT_TASK_REQUEST, payload);
            action(CANCEL_TASK_FORM_REQUEST);
        }

    }


    return (


        <Form
            name="todo-form"
            onFinish={onSubmit}
            scrollToFirstError
        >
            <Card>
                <Form.Item
                    initialValue={defaultTaskName && defaultTaskName}
                    name="todo"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your task!',
                        }
                    ]}
                    style={{ display: 'flex'}}
                >
                    <Input.TextArea/>
                </Form.Item>

                    {defaultPickDate ? <DatePicker
                            showTime={{ format: 'HH:mm' }}
                            onChange={(value) => value ? setDateTime(value.format('DD/MM/YYYY HH:mm')) : setDateTime(value)}
                            defaultValue={moment( defaultPickDate+' '+defaultPickTime, 'DD/MM/YYYY HH:mm')}
                            format={'DD/MM/YYYY HH:mm'}
                        />
                    : <DatePicker
                            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                            onChange={(value) => value ? setDateTime(value.format('DD/MM/YYYY HH:mm')) : setDateTime(value)}
                            format={'DD/MM/YYYY HH:mm'}
                        />
                    }


                    <Select labelInValue defaultValue={{ value: defaultSelected }} style={{width: 120, marginLeft: 10}} onChange={(value)=>setProjectID(value.value)}>
                        {projects && projects.map((project,index)=>
                            <Option key={index} value={project._id}>
                                {project.name}
                            </Option>
                        )}

                       </Select>



            </Card>
            <br/>
            <Form.Item>


                {todoReducer.isOpenTaskForm === true && <Button type="primary" htmlType="submit">
                    Add task
                </Button>}
                {todoReducer.isOpenEditTaskForm === true && <Button type="primary" htmlType="submit">
                    Submit
                </Button>}
                <Button style={{marginLeft: 10}} onClick={() => action(CANCEL_TASK_FORM_REQUEST)}>
                    Cancel
                </Button>

            </Form.Item>
        </Form>

    );
}

export default TaskForm;