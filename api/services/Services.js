const database = require('../models');

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros() {
        return await database[this.nomeDoModelo].findAll();
    }

    async ataualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } } , transacao);
    }

    async ataualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } } , transacao);
    }
}

module.exports = Services;