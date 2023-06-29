const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autoria: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('livro', LivroSchema)