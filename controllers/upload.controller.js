const { response } = require('express');
const { uploadFileHelper, filesEmpty } = require('../helpers');
const { User, Product } = require('../models');


const uploadFile = async (req, res = response) => {

    if (filesEmpty(req.files)) {
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

    if (filesEmpty(req.files)) {
        return res.status(400).json({ msg: 'No hay archivos que subir' });
    }

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({ msg: `No existe usuario con el id : ${id}` })
            }

            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({ msg: `No existe producto con el id : ${id}` })
            }

            break;

        default:
            return res.status(400).json({ msg: 'Ocurrio un error' })
    }
    const fileName = await uploadFileHelper(req.files, undefined, collection)

    model.img = fileName

    await model.save()

    res.json({ model });
}

module.exports = {
    uploadFile,
    updateImage
}