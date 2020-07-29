import {ADD_TASK_SUCCESS, CANCELED_TASK_FORM, OPEN_TASK_FORM} from "../types/todo.type";

const initialState = {
    isOpenTaskForm : false,
    modalVisible: false,
};

export default (state = initialState, {type,payload}) =>{
    switch (type) {
        case OPEN_TASK_FORM :
            return {...state, isOpenTaskForm: true};
        case CANCELED_TASK_FORM :
            return {...state, isOpenTaskForm: false};
        default :
            return state;
    }
}