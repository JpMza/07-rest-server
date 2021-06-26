const { response } = require('express');
const path = require('path');

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
    const extFile = nameSplitted[nameSplitted.length - 1]

    const extensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensions.includes(extFile)) {
        return res.status(400).json({ msg: 'Extension de archivo no permitida' })
    }
    return res.json(extFile)
    // const uploadPath = path.join( __dirname, '../uploads', file.name);

    // file.mv(uploadPath, (err) => {
    //     if (err)
    //         return res.status(500).json({msg: 'Ocurrió un error al subir un archivo', err});

    //     res.json({msg: 'File uploaded!'});
    // });
}

module.exports = {
    uploadFile
}