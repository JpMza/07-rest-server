const { Router, response } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategoryById } = require('../controllers/category.controller');
const { categoryExistById } = require('../helpers/db-validator');
const {
    validateFields,
    validateJWT,
} = require('../middlewares')

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(categoryExistById),
    validateFields],
    getCategoryById);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es requerido').notEmpty(),
    validateFields],
    createCategory)

router.put('/:id', (req, res) => {
    res.json({ msg: 'put' })
})

router.delete('/', (req, res) => {
    res.json({ msg: ' delete' })
})



module.exports = router;