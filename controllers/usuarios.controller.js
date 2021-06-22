const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req, res) => {

    const { limit = 10, from = 0 } = req.query;
    const query = { status: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({ total, users });
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

    const { uid } = req.uid;

    //Physical delete
    //const user = await Usuario.findByIdAndDelete(id)

    const user = await Usuario.findByIdAndUpdate(id, { status: false })
    const userLogged = req.user
    res.json({
        user,
        userLogged
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