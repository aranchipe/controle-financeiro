const knex = require("../database/connection");

const registerBilling = async (req, res) => {
  const { user } = req;
  const { value, data, description, type } = req.body;

  if ((!value, !data, !description, !type)) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const userFound = await knex("users").where({ id: user.id });

    if (userFound.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Usuário não encontrado, por favor cadastre-se" });
    }

    const billingRegistered = await knex("billings").insert({
      value,
      data,
      description,
      type,
      user_id: user.id,
    });

    if (billingRegistered.length === 0) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível cadastrar o registro" });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }

  res.status(200).json("Registro cadastrado com sucesso");
};

const listBillings = async (req, res) => {
  const { user } = req;

  try {
    const userFound = await knex("users").where({ id: user.id });

    if (userFound.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Usuário não encontrado, por favor cadastre-se" });
    }

    const billings = await knex("billings").where({ user_id: user.id });

    return res.status(200).json(billings);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  registerBilling,
  listBillings,
};
