import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, DatePicker, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {ADD_TASK_REQUEST, CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";
import moment from 'moment';

const {Option} = Select;


function TaskForm(props) {



    const {defaultPickDate} = props;
    const {defaultPickTime} = props;




    const dispatch = useDispatch();
    const action = (type,payload) => dispatch({type,payload});
    const authReducer = useSelector(({authReducer})=>authReducer)
    const [dateTime,setDateTime] = useState(defaultPickDate+' '+defaultPickTime);

    const projects = authReducer.userTask && authReducer.userTask.projects;

    const initialProjctSelected = projects && projects.filter(project=> project.type === 'INITIAL');

    const defaultSelected =  props.defaultSelected ? props.defaultSelected : initialProjctSelected[0]._id;
    const [projectID,setProjectID] = useState(defaultSelected);

    const onSubmit = values => {

        const dateTimeArray = dateTime.split(' ');
        const date = dateTimeArray[0];
        const time = dateTimeArray[1];
        const payload = {
            task : values.todo,
            date : date,
            time : time,
            id : projectID
        }
        action(ADD_TASK_REQUEST, payload);
        action(CANCEL_TASK_FORM_REQUEST);
    }


    return (


        <Form
            name="todo-form"
            onFinish={onSubmit}
            scrollToFirstError
        >
            <Card>
                <Form.Item
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
                            onChange={(value) => value && setDateTime(value.format('DD/MM/YYYY HH:mm'))}
                            defaultValue={moment( defaultPickDate+' '+defaultPickTime, 'DD/MM/YYYY HH:mm')}
                            format={'DD/MM/YYYY HH:mm'}
                        />
                    : <DatePicker
                            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                            onChange={(value) => value && setDateTime(value.format('DD/MM/YYYY HH:mm'))}
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

                <Button type="primary" htmlType="submit">
                    Add task
                </Button>
                <Button style={{marginLeft: 10}} onClick={() => action(CANCEL_TASK_FORM_REQUEST)}>
                    Cancel
                </Button>

            </Form.Item>
        </Form>

    );
}

export default TaskForm;