const database = require('../models')

class UsuarioService {
    async cadastrar(dto){
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if(usuario){
            throw new Error('usuario já existe')
        }

    }

}

module.experts = UsuarioControlle