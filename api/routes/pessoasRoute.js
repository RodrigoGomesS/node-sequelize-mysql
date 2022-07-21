const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js')

const router = Router();

router
    .get('/pessoas', PessoaController.buscaPessoasAtivas)
    .get('/pessoas/todas', PessoaController.buscaPessoas)
    .get('/pessoas/:id', PessoaController.buscaUmaPessoa)
    .get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatricula)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.buscaUmaMatricula)
    .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
    .get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
    .post('/pessoas', PessoaController.inserirPessoa)
    .post('/pessoas/:estudanteId/matriculas', PessoaController.inserirMatricula)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .put('/pessoas/:id', PessoaController.atualizarPessoa)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizarMatricula)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletarMatricula)

module.exports = router;