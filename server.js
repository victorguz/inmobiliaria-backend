const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());


// Ruta de login
app.post('/login', (req, res) => {
    const userId = req.body.userId; // Ejemplo de userId
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: 86400 }); // Expira en 24 horas
    res.status(200).send({  token: token });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;