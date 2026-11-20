const express = require('express');
const fs = require('node:fs');
const path = require('path');

const puerto = 3000;
const app = express();
const pathProductos = path.join(__dirname, 'data', 'productos.json')
const productos = require('./data/productos.json');

app.use(express.static(path.join(__dirname, 'html')));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

// ------------- Productos -------------
app.get('/productos', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'html', 'productos.html'));
    } catch (e) {
        console.log('Error:', e);
    }
});

app.get('/api/productos', (req, res) => {
    res.json(productos);
})

app.get('/productos/:id', async (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        return res.status(404).send('<h1 style="font-family: Verdana;">404 Not Found</h1>');
    }
    
    res.json(producto);
});

app.post('/api/productos', async (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        categoriaId: req.body.categoriaId
    };
    productos.push(nuevoProducto);
    fs.writeFileSync(pathProductos, JSON.stringify(productos, null, 4));
    res.status(201).json(nuevoProducto);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(puerto, ()=> {
    console.log(`Servidor escuchando en puerto ${puerto}`);
});