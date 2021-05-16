const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usersPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller')


const router = Router();

router.get('/', usuariosGet );

router.post('/',[
    check('email', 'El correo no es valido').isEmail(), 
], usersPost )

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;