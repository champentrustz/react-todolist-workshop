import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Card, DatePicker, Select} from 'antd';
import {useDispatch} from "react-redux";
import {CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";
import moment from 'moment';

const {Option} = Select;


function TaskForm(props) {



    const {defaultPickDate} = props;
    const {defaultPickTime} = props;
    const dispatch = useDispatch();
    const action = (type) => dispatch({type});
    const [dateTime,setDateTime] = useState(defaultPickDate+' '+defaultPickTime);
    const [project,setProject] = useState('Inbox');


    const onSubmit = values => {

        const dateTimeArray = dateTime.split(' ');
        const date = dateTimeArray[0];
        const time = dateTimeArray[1];
        console.log(values);
        console.log(date);
        console.log(time)
        console.log(project)
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
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item>

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


                    <Select defaultValue="Inbox" style={{width: 120, marginLeft: 10}} onChange={(value)=>setProject(value)}>
                        <Option value="Inbox">Inbox</Option>
                        <Option value="lucy">Lucy</Option>
                       </Select>
                </Form.Item>


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