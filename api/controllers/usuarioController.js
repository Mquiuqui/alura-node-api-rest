const UsuarioService = require('../services/usuarioService')
const usuarioService = new usuarioService

class UsuarioController {
    async cadastrar(req,res){

        try{
            const {nome, email, senha } = req.body

            const usuario = await usuarioService.cadastrar({nome,email,senha})
    
            res.status(201).send(usuario)
        }catch(error){
            res.status(400).send({ message: error.message })
        }

    }
}