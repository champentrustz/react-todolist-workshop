import React, {useEffect, useState} from "react";
import {
    Route,
    Redirect, useHistory,
} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER_REQUEST, LOAD_USER_SUCCESS} from "../../redux/types/auth.type";
import {REGISTER_REQUEST} from "../../redux/types/register.type";

const axios = require('axios');


function PrivateRoute({children, ...rest}) {


    const authReducer = useSelector(({authReducer}) => authReducer);
    const token = authReducer.token;


    return (

        <Route

            {...rest}
            render={({location}) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}


export default PrivateRoute;