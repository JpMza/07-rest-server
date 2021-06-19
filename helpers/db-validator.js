const Role = require('../models/role');
const Usuario = require('../models/user');

const isValidRole = async (role = '') => {

    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const isEmailRepeated = async (email = '') => {

    const mailExist = await Usuario.findOne({ email });
    if (mailExist) {
        throw new Error(`El correo: ${email} ya está registrado`)
    }

}

const userExistById = async (id) => {

    const userExist = await Usuario.findById(id);
    if (!userExist) {
        throw new Error(`El usuario con el id: ${id} no existe`)
    }

}

module.exports = {
    isValidRole,
    isEmailRepeated,
    userExistById
}