const res = require('express/lib/response');
const mongoose = require('mongoose');
const Incidents = mongoose.model('Incidents');

exports.create = async (data) => {
    var incidents = new Incidents(data);
    await incidents.save();
}

exports.get = async () => {
    const res = await Incidents
        .find({})
        .populate('ong', 'name');
    ;
    return res;
}

exports.getByOng = async (ong) => {
    const res = await Incidents
        .find({
            ong: ong
        })
        .populate('ong', 'name');
    return res;
}

exports.delete = async (id) => {
    //await Incidents.deleteMany();
    await Incidents.findByIdAndRemove(id);
}