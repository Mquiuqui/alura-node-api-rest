const { hash } = require('bcryptjs')
const database = require('../models')
const uuid = require('uuid')

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

        try{
            const senhaHash = await hash(dto.senha,8)

            const novoUsuario = await database.usuarios.create({
                id:uuid.v4(),
                nome:dto.nome, 
                email: dto.email, 
                senha: senhaHash
            })
    
            return novoUsuario
    
        }catch(error){
            throw new Error('erro ao cadastrar usuario')
        }
        
    }

    async listar(){

        const usuarios = await database.usuarios.findAll()

        return usuarios

    }


    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) {
            throw new Error('Usuário informado não cadastrado!')
        }

        return usuario;
    }

    async deletarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error;
        }
    }

    async editarUsuario(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: dto.id
            }
        });

        if (!usuario) {
            throw new Error('Produto informado não cadastrado!')
        }

        try {

            const senhaHash = await hash(dto.senha,8)

            usuario.nome = dto.nome
            usuario.email = dto.email
            usuario.senha = senhaHash

            await usuario.save()

            return await usuario.reload()
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error
        }
    }

}

module.exports = UsuarioService