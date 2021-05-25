const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req, res) => {

    const { limit = 10, from = 0 } = req.query;
    const query = { status: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({ total, usuarios });
}

const usersPost = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new Usuario({ name, email, password, role });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json(user);
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, google, ...rest } = req.body;

    //TODO valudar contra db

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, rest);
    res.json({
        msg: 'put API',
        user
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    //Physical delete
    //const user = await Usuario.findByIdAndDelete(id)

    const user = await Usuario.findByIdAndUpdate(id, {status : false})

    res.json({
        msg: 'delete API',
        user
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
}

module.exports = {
    usuariosGet,
    usersPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}