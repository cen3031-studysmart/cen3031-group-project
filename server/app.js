import express from 'express';

const app = express();

// Example API endpoint
// Requests to http://localhost:3000 would fall under this endpoint
app.get('/api/message', (_, res) => {
    res.send({ message: 'Hello!' });
});

app.listen(3000, () => {
    console.log('App running on port 3000');
});
