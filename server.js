const express = require('express');
const fs = require('node:fs');
const path = require('path');

const puerto = 3000;
const app = express();
const productos = require('./data/productos.json');


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'html', 'index.html'));
});

// ------------- Productos -------------
app.get('/productos', async (req, res) => {
    try {
        res.json(productos);
    } catch (e) {
        console.log('Error:', e);
    }
});

app.get('productos/:id', async (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        return res.status(404).send('<h1 style="font-family: Verdana;">404 Not Found</h1>');
    }
    
    res.json(producto);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(puerto, ()=> {
    console.log(`Servidor escuchando en puerto ${puerto}`);
});