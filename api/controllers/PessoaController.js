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

    static async buscaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const { id } = req.params;
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async inserirMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const matriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(matriculaCriada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novosDados = req.body;
        try {
            await database.Matriculas.update(novosDados, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json({ message: 'Atualiza com sucesso' })
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deletarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } });
            return res.status(200).send('Deletado com sucesso!');
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } });
            return res.status(200).send('Restaurado');
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;