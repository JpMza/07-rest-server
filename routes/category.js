const { Router, response } = require('express');
const { check } = require('express-validator');
const {
    validateFields,
    isAdminRole,
    validateJWT,
    hasRole
} = require('../middlewares')

const router = Router();

router.get('/', (req,res) => {res.json({msg: ' todo ok'})});

router.get('/:id', (req,res) => {
    res.json({msg: ' todo ok'})
});

router.post('/', (req,res)=> {
    res.json({msg: 'post'})
});

router.put('/:id', (req,res)=> {
    res.json({msg: 'put'}) 
})

router.delete('/', (req,res)=> {
    res.json({msg: ' delete'})
})



module.exports = router;