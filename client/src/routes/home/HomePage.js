import React from 'react';
import {Layout} from "antd";
import './home.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import {
    Switch,
    Route,
} from 'react-router-dom';
import Today from "../../components/Home/Today/Today";
import Inbox from "../../components/Home/Inbox/Inbox";



function HomePage() {


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