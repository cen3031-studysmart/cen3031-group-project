import * as React from 'react';
import {SignIn, useUser} from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';

const port = import.meta.env.PORT | 5173;

function Login() {
    const navigate = useNavigate();
    const {isSignedIn} = useUser();

    if (isSignedIn) {
        navigate('/dashboard');
    }

    return (
        <>
            <h2>Login</h2>
            <SignIn forceRedirectUrl={`http://localhost:${port}/dashboard`} />
        </>
    );
}

export default Login;
