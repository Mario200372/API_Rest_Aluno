"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: ["id", "nome", "sobrenome", "peso", "altura"],
        order: [['id', 'desc'], [_Foto2.default, 'id', 'desc']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename']
        }
      });
      return res.json({ message: 'Lista de alunos carregada com sucesso.', alunos });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body); // Adicionado `await`
      return res.json({ message: 'Aluno cadastrado com sucesso.', aluno });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['Faltando ID.'] });
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "peso", "altura"],
        order: [['id', 'desc'], [_Foto2.default, 'id', 'desc']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename']
        }
      });
      if (!aluno) {
        return res.status(404).json({ errors: ['Aluno não encontrado.'] });
      }

      return res.json({ message: 'Aluno encontrado com sucesso.', aluno });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['Faltando ID.'] });
      }

      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(404).json({ errors: ['Aluno não encontrado.'] });
      }

      await aluno.destroy();
      return res.json({ message: `Aluno ${aluno.nome} apagado com sucesso.` }); // Confirmação mais clara
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: ['Faltando ID.'] });
      }

      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(404).json({ errors: ['Aluno não encontrado.'] });
      }

      const alunoAtualizado = await aluno.update(req.body);
      return res.json({ message: 'Aluno atualizado com sucesso.', aluno: alunoAtualizado });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

exports. default = new AlunoController();
