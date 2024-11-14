import * as React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {ClerkProvider, SignedIn, SignedOut, UserButton, useUser} from '@clerk/clerk-react';
import Header from '../../components/Header';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk publishable key to the .env.local file');
}


function Root() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, {replace: true})}
            publishableKey={PUBLISHABLE_KEY}
            afterSignOutUrl="http://localhost:5173/login"
        >
            <Header />
            <Outlet />
        </ClerkProvider>
    )
}

export default Root;
