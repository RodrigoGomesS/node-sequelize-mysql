const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController')

const router = Router();

router.get('/pessoa', PessoaController.buscaPessoa);

module.exports = router;