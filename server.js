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
    const {username, password, users} = req.body; 
    const find=users?.find(user=>user.username===username );
    if(find){
    if(find.password===password){
        const userId = find?.id;
        const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: 86400 }); // Expira en 24 horas
        res.status(200).send({  token: token });
    }else{
        res.status(401).send({ message: 'Usuario o contraseña incorrecta' });
    }
}else{
        res.status(404).send({ message: 'El usuario no existe' });

    }
});

app.post('/registrar', (req, res) => {
    const {username, password,rol, users} = req.body; 
    const find=users?.find(user=>user.username===username );
    if(find){
        res.status(404).send({ message: 'El usuario ya existe' });
    }
        res.status(200).send(req.body);
});

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports = app;