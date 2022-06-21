const database = require('../models');

class PessoaController {
    static async buscaPessoa(req, res) {
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async buscaUmaPessoa(req, res) {
        try {
            const { id } = req.params;
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async inserirPessoa(req, res) {
        const pessoa = req.body;
        try {
            const pessoaInserida = await database.Pessoas.create(pessoa);
            return res.status(200).json({ message: 'Inserida com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novosDados = req.body;
        try {
            await database.Pessoas.update(novosDados, { where: { id: Number(id) } });
            return res.status(200).json({ message: 'Atualiza com sucesso' })
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deletarPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            return res.status(200).send('Deletado com sucesso!');
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;