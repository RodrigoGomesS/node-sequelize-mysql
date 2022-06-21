const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController')

const router = Router();

router
    .get('/pessoas', PessoaController.buscaPessoa)
    .get('/pessoas/:id', PessoaController.buscaUmaPessoa)
    .post('/pessoas', PessoaController.inserirPessoa)
    .put('/pessoas/:id', PessoaController.atualizarPessoa)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router;