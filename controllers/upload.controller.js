const { response } = require('express');
const { uploadFileHelper } = require('../helpers');
const { User, Product } = require('../models');
const path = require('path');
const fs = require('fs');

const uploadFile = async (req, res = response) => {

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

    try {
        if (model.img) {
            const imagePath = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Ocurrió un error al eliminar imagen previa'
        })
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