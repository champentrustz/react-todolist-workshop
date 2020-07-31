import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {OPEN_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";


function AddTaskButton() {

    const dispatch = useDispatch();
    const action = (type) => dispatch({type});


    return (

        <Button onClick={()=>action(OPEN_TASK_FORM_REQUEST)} icon={<PlusOutlined/>} >Add task</Button>

    );
}

export default AddTaskButton;