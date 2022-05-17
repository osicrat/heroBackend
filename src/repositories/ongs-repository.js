const res = require('express/lib/response');
const mongoose = require('mongoose');
const Ongs = mongoose.model('Ongs');

exports.create = async (data) => {
    var ongs = new Ongs(data)
    await ongs.save();
}

exports.get = async () => {
    const res = await Ongs
        .find({});
    return res;
}

exports.authenticate = async (data) => {
    const res = await Ongs.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Ongs.findById(id);
    return res;
}