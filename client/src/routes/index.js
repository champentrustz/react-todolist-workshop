import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import './index.less';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, useHistory
} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginPage from '../routes/login/LoginPage'
import HomePage from "../routes/home/HomePage";
import RegisterPage from "../routes/register/RegisterPage";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Anauthorized from "../components/Auth/Anauthorized";
import {useSelector} from "react-redux";

function Index() {


    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Navbar/>
                <Switch>
                    <PrivateRoute exact path="/">
                        <Anauthorized exact path="/">
                       <HomePage/>
                       </Anauthorized>
                    </PrivateRoute>
                    <Route exact path="/login">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/register">
                        <RegisterPage/>
                    </Route>
                </Switch>
                <Footer/>
            </Layout>
        </Router>
    );
}

export default Index;
