import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/home/Home';
import Login from './routes/login/Login';
import Dashboard from './routes/dashboard/Dashboard';
import Examples from './routes/examples/Examples';
import Root from './routes/root/Root';
import './index.css';

const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/examples',
                element: <Examples />,
            },
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
