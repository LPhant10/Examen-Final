const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' }
];
let nextId = 3; // Start from the next available ID

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const product = req.body;
    product.id = nextId++;
    products.push(product);
    res.status(201).json(product);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'template.html'));
});

app.listen(3002, () => {
    console.log('MicroApp Products corriendo en el puerto 3002');
});
