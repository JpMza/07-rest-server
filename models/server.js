const express = require('express')
var cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios'

        //Middlewares
        this.middlewares()
        //Rutas de mi app
        this.routes();
    }

    middlewares() {
        this.app.use(cors())

        //Body Parse and reading
        this.app.use(express.json());

        //directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usuariosRoutePath, require('../routes/user'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        })
    }
}

module.exports = Server