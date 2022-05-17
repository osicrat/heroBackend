const repository = require('../repositories/incidents-repository');
const ValidationContract = require('../validators/validators');
const authService = require('../services/auth-service');


exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
};

exports.getByOng = async (req, res, next) => {
    try {
        var data = await repository.getByOng(req.params.ong);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
}


exports.post = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.isRequired(req.body.title, 'O caso deve ser preenchido');
    contract.isRequired(req.body.description, 'A descrição deve ser preenchido');
    contract.isRequired(req.body.value, 'O valor é requerido')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        const data = await authService.decodeToken(token);

        await repository.create({
            ong: data._id,
            title: req.body.title,
            description: req.body.description,
            value: req.body.value

        });
        res.status(201).send({
            message: 'incident cadastrado'

        });
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'

        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message: 'incident removido!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar a requisição'
        });
    }
}