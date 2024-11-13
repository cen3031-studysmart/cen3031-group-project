import * as React from 'react';

function Examples() {
    return (
        <>
            <div>
                <h1>StudySmart</h1>
                <h2>Documentation and Examples</h2>
                <div>
                    <h3>Backend API Requests</h3>
                    <BackendAPIRequest />
                </div>
            </div>
        </>
    );
}

function BackendAPIRequest() {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        async function getMessage() {
            const request = await fetch('http://localhost:3000/api/message');
            const msg = await request.json();
            setMessage(msg.message);
        }
        getMessage();
    });

    return (
        <div>
            <p>API Response: {message}</p>
        </div>
    );
}

export default Examples;
