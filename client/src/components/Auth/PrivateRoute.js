import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";

import {useSelector} from "react-redux";



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