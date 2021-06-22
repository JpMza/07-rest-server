const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users'
        }

        //Conectar a la base de datos
        this.conectarDb();
        //Middlewares
        this.middlewares()
        //Rutas de mi app
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors())

        //Body Parse and reading
        this.app.use(express.json());

        //directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/user'));
        this.app.use(this.paths.users, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/category'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        })
    }
}

module.exports = Server