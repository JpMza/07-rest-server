const { Router } = require('express');
const { usuariosGet, usersPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller')


const router = Router();

router.get('/', usuariosGet );

router.post('/', usersPost )

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;