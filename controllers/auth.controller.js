const { response, request } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { validateFields } = require('../middlewares/fields-validation');
const { generateJWT } = require('../helpers/jwt-generator');

const login = async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe' })
    }

    if (!user.status) {
      return res.status(400).json({ msg: 'El usuario no está activo' })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'La contraseña es incorrecta' })
    }

    const token = await generateJWT(user.id);
    res.status(200).json({ user, token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

}

const googleSignIn = (req, res = response) => {
  const {id_token} = req.body 

  res.json({
    msg: 'Google',
    id_token
  })
}

module.exports = {
  login,
  googleSignIn
}