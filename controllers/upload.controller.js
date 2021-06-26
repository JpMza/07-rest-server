const { response } = require('express');
const { uploadFileHelper } = require('../helpers');

const uploadFile = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos que subir' });
    }

    try {
        //const fileName = await uploadFileHelper(req.files, ['txt', 'md'],'text');
        const fileName = await uploadFileHelper(req.files, undefined, 'img')

        res.json({ msg: `El archivo se subió correctamente: ${fileName}` })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Ocurrio un error al subir el archivo' })
    }
}

const updateImage = async (req, res = response) => {

    const {id, collection} = req.params; 

    res.json({msg: 'pepe'});
}
 
module.exports = {
    uploadFile,
    updateImage
}