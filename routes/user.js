const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usersPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');
const { isValidRole } = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/fields-validation');

const router = Router();

router.get('/', usuariosGet );

router.post('/',[
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'La contraseña es obligatorio y debe ser de mas de 6 caracteres').isLength({min: 6}),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    validateFields
], usersPost )

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;