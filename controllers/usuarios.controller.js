const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGet = (req, res) => {
 
    const {id, nombre = "No name",page = 1 , apk} = req.query;

    res.json({
        msg: 'get API - controlador',
        id,
        nombre,
        apk,
        page
    })
}

const usersPost = async  (req, res) => {
    
    const errors = validationResult( req );
    console.log(errors)
    if ( !errors.isEmpty()){
        res.status(400).json(errors)
    }

    const {name, email, password, role} = req.body
    const usuario = new Usuario( {name, email, password, role });
console.log(usuario)
    // Verificar si el correo existe
    const mailExist = await Usuario.findOne({ email });
    console.log(mailExist)
    if( mailExist ){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        })
    }

    //Encriptar contraseña

    const salt = bcrypt.genSaltSync();

    const body = req.body;
    //const {nombre , edad} = req.body;
    usuario.password = bcrypt.hashSync( password , salt);  

    await usuario.save();


    res.status(201).json({
        msg: 'post API',
        usuario
    });
}

const usuariosPut =  (req, res) => {
    const {id} = req.params

    res.json({
        msg: 'put API',
        id
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