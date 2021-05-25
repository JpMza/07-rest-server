const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    img: {
        type: String   
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
})


UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario } = this.toObject();

    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema);