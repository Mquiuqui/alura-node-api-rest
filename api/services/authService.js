const { compare } = require('bcryptjs')
const database = require('../models')
const { sign } = require('jsonwebtoken')
const jsonSecret  = require('../config/jsonSecret')



class AuthService {
    async login(dto){
        const usuario = await database.usuarios.findOne({
            attributes:['id','email','senha'],
            where:{
                email: dto.email
            }
        })

        if (!usuario){
            throw new Error('Usuário não cadastrado')
        }

        const senhaIguais = compare(dto.senha,usuario.senha)

        if(!senhaIguais){
            throw new Error('Usuário ou Senha Inválido')
        }

        const accessToken = sign({
            id: usuario.id,
            email: usuario.email
        },jsonSecret.secret,{
            expiresIn: 86400
        })

        return {accessToken}
    }
}

module.exports = AuthService