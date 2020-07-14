import React from "react";
import {
    Route, Link,
} from "react-router-dom";

import {useSelector} from "react-redux";
import {Alert, Button, Layout} from "antd";

const {Content} = Layout;




function Anauthorized({children, ...rest}) {


    const authReducer = useSelector(({authReducer}) => authReducer);
    const isAuthenticated = authReducer.isAuthenticated;


    return (

        <Route

            {...rest}
            render={() =>
                isAuthenticated === false ? (
                    <AlertAnauthorized/>
                ) : (
                    children
                )
            }
        />
    );
}

function AlertAnauthorized() {
    return(
        <Content className="content-layout">
        <Alert message="Authorization denied" type="error" description={
            <Button style={{marginTop:10}} danger>
                <Link to="/login">Login</Link>
            </Button>} showIcon />
        </Content>
    )
}


export default Anauthorized;