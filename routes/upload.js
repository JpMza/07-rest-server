const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage } = require('../controllers/upload.controller');
const { allowedCollections } = require('../helpers');
const { validateFields } = require('../middlewares');

const router = Router();


router.post('/', uploadFile);

router.put('/:collection/:id', [
    check('id', 'Id no valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateImage)

module.exports = router

