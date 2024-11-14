import * as React from 'react';
import {Link} from 'react-router-dom';
import {useUser, UserButton} from '@clerk/clerk-react';

function Header() {
    const {isSignedIn, user, isLoaded} = useUser();

    return (
        <>
            <div>
                <h1>StudySmart</h1>
                {isSignedIn ?
                    <div>
                        <h3>Hello, {user.firstName}</h3>
                        <UserButton />
                    </div> :
                    <div>
                        <Link to="/login">Login</Link>
                    </div>}
            </div>
        </>
    )
}

export default Header;
