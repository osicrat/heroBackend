const repository = require('../repositories/ongs-repository');
const ValidationContract = require('../validators/validators');
const authService = require('../services/auth-service');
const md5 = require('md5');
require("dotenv").config();



exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
}




exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 2, 'O nome deve ter pelo menos 4 caracteres');
    contract.isEmail(req.body.email, 'O email é invalido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 caracteres');
    contract.hasMaxLen(req.body.phone, 11, 'O numero do telefone é invalido');
    contract.hasMinLen(req.body.city, 3, 'O nome da cidade é requerido');
    contract.hasMaxLen(req.body.uf, 2, 'O uf da cidade é obrigatório')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + process.env.SALT_KEY),
            phone: req.body.phone,
            city: req.body.city,
            uf: req.body.uf

        });
        res.status(201).send({
            message: 'Ong Cadastrada com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
}



exports.authenticate = async (req, res, next) => {
    try {
        const ongs = await repository.authenticate({

            email: req.body.email,
            password: md5(req.body.password + process.env.SALT_KEY)
        });

        if (!ongs) {
            res.status(403).send({
                message: 'Usuário ou senha invalidos'
            })
            return;
        }

        const token = await authService.generateToken({
            _id: ongs._id,
            email: ongs.email,
            name: ongs.name
        })

        res.status(201).send({
            token: token,
            ong: {
                _id: ongs._id,
                email: ongs.email,
                name: ongs.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const ongs = await repository.getById(data._id);

        if (!ongs) {
            res.status(404).send({
                message: 'Usuário não encontrado'
            })
            return;
        }

        const tokenData = await authService.generateToken({
            _id: ongs._id,
            email: ongs.email,
            name: ongs.name
        })

        res.status(201).send({
            token: token,
            ong: {
                _id: ongs._id,
                email: ongs.email,
                name: ongs.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
};