const { Router } = require('express');
const { check } = require('express-validator');
const { login,googleSignIn } = require('../controllers/auth.controller');
const { uploadFile } = require('../controllers/upload.controller');
const { validateFields } = require('../middlewares/fields-validation');

const router = Router();


router.post('/', uploadFile);

module.exports = router

