const express = require('express');
const path = require('path');
const puerto = 3000;
const app = express();

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(puerto, ()=> {
    console.log(`Servidor escuchando en puerto ${puerto}`);
});