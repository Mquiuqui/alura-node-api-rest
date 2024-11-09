const UsuarioService = require('../services/usuarioService')
const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req,res){

        try{
            const {nome, email, senha } = req.body

            const usuario = await usuarioService.cadastrar({nome,email,senha})
    
            res.status(201).send(usuario)
        }catch(error){
            res.status(400).send({ message: error.message })
        }

    }

    static async listar(req,res){

        try{

            const usuario = await usuarioService.listar()
    
            res.status(201).send(usuario)
        }catch(error){
            res.status(400).send({ message: error.message })
        }

    }

    static async buscarUsuarioPorId(req, res) {
        try {
            const { id } = req.params
            const usuario = await usuarioService.buscarUsuarioPorId(id)
            
            res.status(200).json(usuario) 
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarUsuarioPorId(req, res) {
        const { id } = req.params
        
        try {
            await usuarioService.deletarUsuarioPorId(id)
            
            res.status(200).send({ message: 'Usuario deletada com sucesso!' })
            
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
    
    static async editarUsuario(req, res) {
        const { id } = req.params
        const { nome, email, senha } = req.body
        
        try {
            const usuario = await usuarioService.editarUsuario({ id, nome, email, senha })
            
            res.status(200).json(usuario)
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }

}

module.exports = UsuarioController