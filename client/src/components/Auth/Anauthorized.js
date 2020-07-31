import React from "react";
import {
    Route, Redirect,
} from "react-router-dom";

import {useSelector} from "react-redux";





function Anauthorized({children, ...rest}) {


    const authReducer = useSelector(({authReducer}) => authReducer);
    const isAuthenticated = authReducer.isAuthenticated;


    return (

        <Route

            {...rest}
            render={({location}) =>
                isAuthenticated === false ? (
                    <Redirect
                        to={{
                            pathname: "/auth-error",
                            state: {from: location}
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
}



export default Anauthorized;