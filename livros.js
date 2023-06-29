const express = require('express')
const router = express.Router()
const cors = require('cors')
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Livro = require('./livroModel')

const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333

//GET
async function mostraLivro(request, response) {
    try {
        const livrosVindosDoBancoDeDados = await Livro.find()

        response.json(livrosVindosDoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }
}

//POST
async function criaLivro(request, response) {
    const novoLivro = new Livro({
        titulo: request.body.titulo,
        autoria: request.body.autoria,
        categoria: request.body.categoria
    })

    try {
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    } catch(erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeLivro(request, response) {
    try {
        const livroEncontrado = await Livro.findById(request.params.id)

        if(request.body.titulo){
            livroEncontrado.titulo = request.body.titulo
        }
    
        if(request.body.autoria) {
            livroEncontrado.autoria = request.body.autoria
        }

        if(request.body.categoria) {
            livroEncontrado.categoria = request.body.categoria
        }

        const livroAtualizadoNoBAncoDeDados = await livroEncontrado.save()

        response.json(livroAtualizadoNoBAncoDeDados)
    } catch(erro){
        console.log(erro)
    }
}

//DELETE
async function deletaLivro(request, response) {
    try{
        await Livro.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Livro deletado!' })
    } catch(erro){
        console.log(erro)
    }
}

app.use(router.get('/livros', mostraLivro))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros/:id', deletaLivro))

function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}
app.listen(porta, mostraPorta)