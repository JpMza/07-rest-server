const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/fields-validation');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email','El correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validateFields
], login);

module.exports = router

