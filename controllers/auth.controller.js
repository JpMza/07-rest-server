const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validateFields } = require('../middlewares/fields-validation');
const { generateJWT } = require('../helpers/jwt-generator');
const { verifyGoogle } = require('../helpers/google-verify');

const login = async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe' })
    }

    if (!user.active) {
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body

  try {

    const { name, img, email } = await verifyGoogle(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      }

      user = new User(data);
      await user.save();
    }

    if (!user.status){
      return res.status(401).json({
        msg: 'Hable con el administrador'
      })
    }

    const token = await generateJWT(user.id);

      res.json({
        msg: 'Google',
        user,
        token
      })
  } catch (error) {
    res.status(400).json({ msg: 'Token de Google no reconocido' })
  }


}

module.exports = {
  login,
  googleSignIn
}