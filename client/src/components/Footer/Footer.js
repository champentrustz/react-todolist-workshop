import React from 'react';
import {Layout} from 'antd';
import './footer.css'

const {Footer: FooterBar} = Layout;

function Footer() {
    return (
        <FooterBar className="show-footer-center">
            <div className="text-center">Todo-list Workshop ©2020 Created by Champ Pittaya</div>
        </FooterBar>
    );
}

export default Footer;