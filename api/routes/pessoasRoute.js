const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js')

const router = Router();

router
    .get('/pessoas', PessoaController.buscaPessoa)
    .get('/pessoas/:id', PessoaController.buscaUmaPessoa)
    .post('/pessoas', PessoaController.inserirPessoa)
    .put('/pessoas/:id', PessoaController.atualizarPessoa)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.buscaUmaMatricula)
    .post('/pessoas/:estudanteId/matriculas', PessoaController.inserirMatricula)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizarMatricula)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletarMatricula)

module.exports = router;