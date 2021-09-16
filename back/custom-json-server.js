const port = 3004;
require('dotenv-safe').config();
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const express = require('express');
const jwt = require('jsonwebtoken');

// midleware defaults, json-server usa express e lowDB por baixo.
server.use(middlewares)
server.use(express.urlencoded({ extended: true }))
server.use(jsonServer.bodyParser)

server.post('/login', (req, res, next) => {

    let result = router.db.get('usuarios').find({ email: req.body.login , password: req.body.password }).value();

    if(result) {
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 5 * 60 * 60 // expires in 5 hs
        });
        return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
})

server.get('/clientes', verifyJWT, (req, res, next) => { //isso intermedia a rota clientes e passa pela verificação do jwt
    next();
})

server.get('/clientes/:id', verifyJWT, (req, res, next) => { //isso intermedia a rota clientes e passa pela verificação do jwt
    next();
})

server.post('/clientes', verifyJWT, (req, res, next) => { //isso intermedia a rota clientes e passa pela verificação do jwt
    next();
})

server.put('/clientes/:id', verifyJWT, (req, res, next) => { //isso intermedia a rota clientes e passa pela verificação do jwt
    next();
})


function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

server.use(router) //as rotas default do json-server

server.listen(port, () => {
    console.log('JSON Server is running on port ' + port)
})


