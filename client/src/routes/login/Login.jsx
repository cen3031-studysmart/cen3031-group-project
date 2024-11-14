import * as React from 'react';
import {SignIn, useUser} from '@clerk/clerk-react';

const port = import.meta.env.PORT | 5173;

function Login() {
    return (
        <>
            <h2>Login</h2>
            <SignIn forceRedirectUrl={`http://localhost:${port}/dashboard`} />
        </>
    );
}

export default Login;
