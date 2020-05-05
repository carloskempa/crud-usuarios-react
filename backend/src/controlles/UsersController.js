const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const users = await connection("Usuarios").select("*");
    return res.json(users);
  },

  async create(req, res) {
    const { name, email } = req.body;
    const [id] = await connection("Usuarios").insert({
      name,
      email,
    });
    return res.json({ id, name, email });
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    await connection("Usuarios").where("id", id).update({
      name,
      email,
    });
    return res.json({ id, name, email });
  },

  async delete(req, res) {
    const { id } = req.params;
    await connection("Usuarios").where("id", id).delete();
    return res.status(204).send();
  },
};
