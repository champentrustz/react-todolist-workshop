import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import './navbar.css';
import {useLocation } from "react-router-dom";

const {Header} = Layout;



function Navbar () {

    const [visible, setVisible] = useState('');

    const location = useLocation();

    useEffect(() => {
        const checkPath = () => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setVisible('hidden');
            console.log('hidden');
        } else {
            setVisible('visibility');
            console.log('visibility');
        }
    };
    checkPath();
    },[location.pathname]);


    return (
        <div>
            {visible === 'visibility' ? <ShowNavBar/> : null }
        </div>


    )
}

function ShowNavBar() {


    return (
        <Header style={{padding: 0}}>
            <div className="logo-layout">

                <a href={'/'}>
                <h1 style={{margin:0}}><img style={{height: '31px'}} src={process.env.PUBLIC_URL + '/images/to-do-list.svg'} alt="logo"/>
                <span style={{margin:'0 40px 0 10px'}}>Todo-List</span></h1>
                </a>

            </div>



            <Menu  theme="light" mode="horizontal" defaultSelectedKeys={['2']}>

                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>

            </Menu>



        </Header>
    );
}

export default Navbar;