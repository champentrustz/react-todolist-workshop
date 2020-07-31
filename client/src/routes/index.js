import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import './index.less';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginPage from '../routes/login/LoginPage'
import HomePage from "../routes/home/HomePage";
import RegisterPage from "../routes/register/RegisterPage";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Anauthorized from "../components/Auth/Anauthorized";
import AuthErrorPage from "./auth-error/AuthErrorPage";

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
                    <PrivateRoute exact path="/inbox">
                        <Anauthorized exact path="/inbox">
                            <HomePage/>
                        </Anauthorized>
                    </PrivateRoute>
                    <PrivateRoute exact path="/project/:id">
                        <Anauthorized exact path="/project/:id">
                            <HomePage/>
                        </Anauthorized>
                    </PrivateRoute>
                    <Route exact path="/login">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/register">
                        <RegisterPage/>
                    </Route>
                    <Route exact path="/auth-error">
                        <AuthErrorPage/>
                    </Route>
                </Switch>
                <Footer/>
            </Layout>
        </Router>
    );
}

export default Index;
