import React from 'react';
import {Alert, Button, Layout} from "antd";
import {Link} from "react-router-dom";

const {Content} = Layout;

function AuthErrorPage() {
    return(
        <Content className="content-layout">
            <Alert message="Authorization denied" type="error" description={
                <Button style={{marginTop:10}} danger>
                    <Link to="/login">Login</Link>
                </Button>} showIcon />
        </Content>
    )
}

export default AuthErrorPage;