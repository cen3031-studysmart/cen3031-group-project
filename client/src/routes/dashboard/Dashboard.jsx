import * as React from 'react';
import {useUser} from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const {isSignedIn} = useUser();

    if (!isSignedIn) {
        navigate('/login');
    }

    return (
        <>
            <h2>Dashboard</h2>
        </>
    );
}

export default Dashboard;
