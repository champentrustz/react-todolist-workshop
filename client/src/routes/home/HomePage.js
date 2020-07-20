import React, {useEffect} from 'react';
import {Layout} from "antd";
import './home.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import {
    Switch,
    Route,
} from 'react-router-dom';
import Today from "../../components/Home/Today/Today";
import Inbox from "../../components/Home/Inbox/Inbox";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER_TASKS_REQUEST} from "../../redux/types/auth.type";



function HomePage() {


    const dispatch = useDispatch();
    const action = (type) => dispatch({type});

    useEffect(()=>{
        action(LOAD_USER_TASKS_REQUEST);
    },[])

    const authReducer = useSelector(({authReducer}) => authReducer);
    console.log(authReducer.userTask)

    return(
        <Layout className="content-layout">
        <Sidebar/>
            <Switch>
                <Route exact path="/">
                    <Today/>
                </Route>
                <Route exact path="/inbox">
                    <Inbox/>
                </Route>
            </Switch>
        </Layout>
)

}






export default HomePage;