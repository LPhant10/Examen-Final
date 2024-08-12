const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let orders = [
    { id: 1, user: 'Alice', product: 'Laptop' }
];
let nextId = 2; // Start from the next available ID

app.get('/orders', (req, res) => {
    res.json(orders);
});

app.post('/orders', (req, res) => {
    const order = req.body;
    order.id = nextId++;
    orders.push(order);
    res.status(201).json(order);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'template.html'));
});

app.listen(3003, () => {
    console.log('MicroApp Orders corriendo en el puerto 3003');
});
