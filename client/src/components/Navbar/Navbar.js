import React, {useEffect, useState} from 'react';
import {Layout, Menu, Button, Avatar} from 'antd';
import './navbar.css';
import {useLocation, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {LOAD_USER_REQUEST, LOGOUT_REQUEST} from "../../redux/types/auth.type";
import {UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';


const {Header} = Layout;
const {SubMenu} = Menu;


function Navbar() {

    const dispatch = useDispatch();
    const action = (type) => dispatch({type});
    const [visible, setVisible] = useState('');
    const location = useLocation();


    useEffect(() => {

        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/auth-error') {
            setVisible('hidden');
        } else {
            setVisible('visibility');
            action(LOAD_USER_REQUEST);
        }

    }, [location]);

    // useEffect(() => {
    //
    //     if(isAuthenticated === false){
    //         setVisible('hidden');
    //     }
    // },[isAuthenticated]);


    return (
        <div>
            {visible === 'visibility' ? <ShowNavBar/> : null}
        </div>


    )
}

function ShowNavBar() {

    const authReducer = useSelector(({authReducer}) => authReducer);
    const userData = authReducer.userData;

    function logout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Header style={{padding: 0}}>
            <div className="logo-layout">
                <Link to="/">
                    <h1  style={{margin: 0}}><img style={{height: '31px'}}
                                                 src={process.env.PUBLIC_URL + '/images/to-do-list.svg'} alt="logo"/>
                        <span style={{margin: '0 40px 0 10px'}}>Todo-List</span></h1>
                </Link>
            </div>


            <Menu theme="light" mode="horizontal">
                {userData ?
                    <SubMenu  style={{float: 'right', marginRight: 20}} icon={<UserOutlined/>} title={userData.name}>
                        <Menu.Item key="1" icon={<LogoutOutlined/>} onClick={() => logout()}>Logout</Menu.Item>

                    </SubMenu> : null
                }
            </Menu>




        </Header>
    );
}

export default Navbar;