import authReducer from './auth.reducer';
import todoReducer from './todo.reducer'
const {combineReducers} = require("redux");



export default combineReducers({
    authReducer,
    todoReducer
});