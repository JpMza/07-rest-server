const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req , res = response, next) => {

    const token = req.header('x-token');
    console.log(token);

    if (!token ){   
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        })
    }

    try {
        const {uid} = jwt.verify(token , process.env.SECRET_KEY)
        req.uid = uid;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token invalido'
        })
        
    }

}

module.exports = {
    validateJWT
}

