const express = require("express");
const usuarioController = require("./controlles/UsersController");

const routes = express.Router();

routes.get("/users", usuarioController.index);
routes.post("/users", usuarioController.create);
routes.put("/users/:id", usuarioController.update);
routes.delete("/users/:id", usuarioController.delete);

module.exports = routes;
