import React from 'react';
import {Form, Input, Typography, Button, Card, DatePicker} from 'antd';
import {useDispatch} from "react-redux";
import {CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";

const {Title} = Typography;

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


function TaskForm(props) {

    const dispatch = useDispatch();
    const dateFormat = 'DD/MM/YYYY';
    const action = (type) => dispatch({type});


    function onChange(dateString) {
        console.log( dateString);
    }

    function onSubmit (values) {
        console.log(values);
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

                <DatePicker onChange={onChange} format={dateFormat} />

            </Card>
            <br/>
            <Form.Item >

                   <Button type="primary" htmlType="submit">
                        Add task
                    </Button>
                <Button style={{marginLeft: 10}} onClick={()=> action(CANCEL_TASK_FORM_REQUEST)}>
                    Cancel
                </Button>

            </Form.Item>
        </Form>

    );
}

export default TaskForm;