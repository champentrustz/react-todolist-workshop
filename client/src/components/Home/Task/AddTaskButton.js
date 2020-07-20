import React, {useEffect} from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {ADD_TASK_FORM_REQUEST, CANCEL_TASK_FORM_REQUEST} from "../../../redux/types/todo.type";


function AddTaskButton() {

    const dispatch = useDispatch();
    const action = (type) => dispatch({type});


    return (

        <Button onClick={()=>action(ADD_TASK_FORM_REQUEST)} icon={<PlusOutlined/>} >Add task</Button>

    );
}

export default AddTaskButton;