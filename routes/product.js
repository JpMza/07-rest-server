const { Router, response } = require('express');
const { check } = require('express-validator');
const { createProduct, getProductById, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { productExistByName, productExistById, productAlreadyDeleted } = require('../helpers/db-validator');
const {
    validateFields,
    validateJWT,
    isAdminRole,
} = require('../middlewares')

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productExistByName),
    validateFields],
    getProductById);

router.post('/', [
    validateJWT,
    check('name').custom(productExistByName),
    check('name', 'El nombre es requerido').notEmpty(),
    validateFields],
    createProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productExistByName),
    validateFields],
    updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(productExistById),
    check('id').custom(productAlreadyDeleted),
    validateFields],
    deleteProduct);



module.exports = router;