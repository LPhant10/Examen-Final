const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];
let nextId = 3; // Start from the next available ID

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = nextId++;
    users.push(user);
    res.status(201).json(user);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'template.html'));
});

app.listen(3001, () => {
    console.log('MicroApp Users corriendo en el puerto 3001');
});
