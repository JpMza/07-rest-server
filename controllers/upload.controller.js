const { response } = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (req, res = response) => {

    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos que subir' });
    }

    if (!req.files.file) {
        return res.status(400).json({ msg: 'No hay archivos que subir' });
    }

    const { file } = req.files;
    const nameSplitted = file.name.split('.');
    const fileExt = nameSplitted[nameSplitted.length - 1]

    const extensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensions.includes(fileExt)) {
        return res.status(400).json({ msg: 'Extension de archivo no permitida' })
    }

    const tempName = uuidv4() + '.' + fileExt;


    const uploadPath = path.join(__dirname, '../uploads', tempName);

    file.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).json({ msg: 'Ocurrió un error al subir un archivo', err });

        res.json({ msg: 'File uploaded!' });
    });
}

module.exports = {
    uploadFile
}