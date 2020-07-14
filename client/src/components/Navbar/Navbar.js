import React, {useEffect, useState} from 'react';
import {Layout, Menu, Typography} from 'antd';
import './navbar.css';
import {useLocation, Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {LOAD_USER_REQUEST} from "../../redux/types/auth.type";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';


const {Header} = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;



function Navbar () {

    const [visible, setVisible] = useState('');
    const location = useLocation();
    const dispatch = useDispatch();
    const action = (type) => dispatch({type});

    const authReducer = useSelector(({authReducer}) => authReducer);
    const isAuthenticated = authReducer.isAuthenticated;
    const userData = authReducer.userData;

    useEffect(() => {


        if (location.pathname === '/login' || location.pathname === '/register') {
            setVisible('hidden');
        } else {
            setVisible('visibility');
            action(LOAD_USER_REQUEST);
        }


    },[location]);

    // useEffect(() => {
    //
    //     if(isAuthenticated === false){
    //         setVisible('hidden');
    //     }
    // },[isAuthenticated]);


    return (
        <div>
            {visible === 'visibility' ? <ShowNavBar/> : null }
        </div>


    )
}

function ShowNavBar() {

    const authReducer = useSelector(({authReducer}) => authReducer);
    const userData = authReducer.userData;


    return (
        <Header style={{padding: 0}}>
            <div className="logo-layout">

                <Link to="/">
                <h1 style={{margin:0}}><img style={{height: '31px'}} src={process.env.PUBLIC_URL + '/images/to-do-list.svg'} alt="logo"/>
                <span style={{margin:'0 40px 0 10px'}}>Todo-List</span></h1>
                </Link>

            </div>



            <Menu  theme="light" mode="horizontal" defaultSelectedKeys={['2']}>

                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>


                {userData ?
                    <SubMenu style={{float:'right',marginRight:20}} icon={<UserOutlined />}  title={ userData.name}>
                    <Menu.Item key="1" icon={<LogoutOutlined />}>Logout</Menu.Item>
                </SubMenu> :
                    <span style={{float:'right',marginRight:20}}><Text type="danger">Anauthorized</Text></span>
                }




            </Menu>


        </Header>
    );
}

export default Navbar;