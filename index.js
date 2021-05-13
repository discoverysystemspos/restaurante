//Env
require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

//Conection DB
const { dbConection } = require('./database/config');

// Crear el servidor
const app = express();

// CORS
app.use(cors());

// READ BODY
app.use(express.json());

// DataBase
dbConection();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// RUTAS
app.use('/api/datos', require('./routes/datos.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/clients', require('./routes/clients.route'));
app.use('/api/departments', require('./routes/departments.route'));
app.use('/api/products', require('./routes/products.route'));
app.use('/api/uploads', require('./routes/uploads.route'));
app.use('/api/search', require('./routes/search.route'));
app.use('/api/invoice', require('./routes/invoices.route'));
app.use('/api/caja', require('./routes/cajas.route'));
app.use('/api/turno', require('./routes/turnos.route'));
app.use('/api/mesas', require('./routes/mesas.route'));
app.use('/api/bascula', require('./routes/bascula.route'));

// SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});