const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/all-data', async (req, res) => {
    try {
        const usersResponse = await axios.get('http://localhost:3001/users');
        const productsResponse = await axios.get('http://localhost:3002/products');
        const ordersResponse = await axios.get('http://localhost:3003/orders');

        const allData = {
            users: usersResponse.data,
            products: productsResponse.data,
            orders: ordersResponse.data
        };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(allData, null, 2));
    } catch (error) {
        res.status(500).send('Error al obtener datos');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Main App corriendo en el puerto 3000');
});
