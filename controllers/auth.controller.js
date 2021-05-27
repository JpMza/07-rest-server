const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { validateFields } = require('../middlewares/fields-validation');

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await Usuario.findOne({ email });

        if ( !user ){
          return res.status(400).json({msg: 'El usuario no existe'})
        }

        if ( !user.status ){
          return res.status(400).json({msg: 'El usuario no está activo'})
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
          return res.status(400).json({msg: 'La contraseña es incorrecta'})
        }

        res.status(200).json({
            msg: "auth",
            email
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}