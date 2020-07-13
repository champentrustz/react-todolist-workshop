import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

import {useSelector} from "react-redux";


function PrivateRoute({ children, ...rest }) {

    const loginReducer = useSelector(({loginReducer}) => loginReducer);
    const token = loginReducer.token;



    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}



export default PrivateRoute;