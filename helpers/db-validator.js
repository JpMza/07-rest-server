const Role = require('../models/role');

const isValidRole = async (role = '') => {

    const roleExist = await Role.findOne({ role });
    if ( !roleExist) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

module.exports = {
    isValidRole
}