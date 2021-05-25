const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');

const usuariosGet = (req, res) => {

    const { id, nombre = "No name", page = 1, apk } = req.query;

    res.json({
        msg: 'get API - controlador',
        id,
        nombre,
        apk,
        page
    })
}

const usersPost = async (req, res) => {

    const { name, email, password, role } = req.body
    const usuario = new Usuario({ name, email, password, role });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();


    res.status(201).json({
        msg: 'post API',
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const {_id, password, email ,google, ...rest } = req.body;

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

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API'
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