const express = require('express')
const router = express.Router()
const app = express()

const porta = 3333

function mostraOla(request, response) {
    response.send("Olá, mundo!")
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}

app.listen(porta, mostraPorta)
app.use(router.get('/ola', mostraOla)) //configura a rota local e chama a resposta do servidor