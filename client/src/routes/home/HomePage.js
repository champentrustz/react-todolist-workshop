import React, {useCallback, useEffect} from 'react';
import {Layout} from "antd";
import './home.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import {
    Switch,
    Route,
} from 'react-router-dom';
import Today from "../../components/Home/Today/Today";
import Inbox from "../../components/Home/Inbox/Inbox";
import Project from "../../components/Home/Project/Project";
import {useDispatch} from "react-redux";
import {LOAD_USER_TASKS_REQUEST} from "../../redux/types/auth.type";



function HomePage() {


    const dispatch = useDispatch();
    const action = useCallback((type) =>{
        dispatch({type});
    },[dispatch])

    useEffect(()=>{
        action(LOAD_USER_TASKS_REQUEST);
    },[action])





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
                <Route exact path="/project/:id">
                   <Project/>
                </Route>

            </Switch>
        </Layout>
)

}




export default HomePage;