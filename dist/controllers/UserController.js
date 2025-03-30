"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  // Criar usuario
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ message: 'Usuário criado com sucesso!', user: { id, nome, email } });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Listar todos os usuários
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });

      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // Visualizar um usuário
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não encontrado.'] });
      }
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // Atualizar usuário
  async update(req, res) {
    try {

      const user = await _User2.default.findByPk(req.userId);
      const { id, nome, email } = novosDados;

      const novosDados = await user.update(req.body);
      return res.json({ message: 'Usuário atualizado com sucesso!', user: { id, nome, email } });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  // Deletar usuário
  async delete(req, res) {
    try {

      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.']
        });
      }

      await user.destroy();
      return res.json({ message: 'Usuário apagado com sucesso!' });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }



  // Restaurar usuário deletado
  async restore(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id, { paranoid: false });
      const { id, nome, email } = user;
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não encontrado.'] });
      }

      await user.restore(); // Método correto para restaurar um usuário deletado

      return res.json({ message: 'Usuário restaurado com sucesso!', user: { id, nome, email } });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Erro ao restaurar usuário.'],
      });
    }
  }

}

exports. default = new UserController();
