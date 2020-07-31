import {CANCELED_TASK_FORM, OPEN_EDIT_TASK_FORM, OPEN_TASK_FORM} from "../types/todo.type";

const initialState = {
    isOpenTaskForm : false,
    isOpenEditTaskForm : false,
    editTaskID : null,
};

export default (state = initialState, {type,payload}) =>{


    switch (type) {
        case OPEN_TASK_FORM :
            return {...state, isOpenTaskForm: true, isOpenEditTaskForm: false};
        case CANCELED_TASK_FORM :
            return {...state, isOpenTaskForm: false, isOpenEditTaskForm: false};
        case OPEN_EDIT_TASK_FORM :
            return {...state, isOpenEditTaskForm : true, isOpenTaskForm: false, editTaskID : payload}
        default :
            return state;
    }
}