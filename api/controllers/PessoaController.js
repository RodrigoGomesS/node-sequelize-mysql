const database = require('../models');
const Sequelize = require('sequelize');

class PessoaController {
    static async buscaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async buscaPessoas(req, res) {
        try {
            const pessoas = await database.Pessoas.scope('todos').findAll();
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

    static async pegaMatricula(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } });
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).send(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            });
            return res.status(200).send(todasMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const turmaLotada = 2;
        try {
            const turma = await database.Matriculas
                .findAndCountAll({
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${turmaLotada}`)
                });
            return res.status(200).json(turma.count);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaUsuario(req, res) {
        const { estudanteId } = req.params;
        try {
            database.sequelize.transaction(async transact => {

                await database.Pessoas
                    .update(
                        { ativo: false },
                        { where: { id: Number(estudanteId) }, transaction: transact },
                    );

                await database.Matriculas
                    .update(
                        { status: 'cancelado' },
                        { where: { estudante_id: Number(estudanteId) }, transaction: transact }
                    );

                const pessoasCanceladas = await database.Matriculas
                    .findAll(
                        { where: { estudante_id: Number(estudanteId) }, transaction: transact },
                    );

                return res.status(200).json(pessoasCanceladas);
            });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;