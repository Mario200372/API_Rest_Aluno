import Aluno from '../models/Aluno';
import Foto from '../models/Foto'

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ["id", "nome", "sobrenome", "peso", "altura"],
        order: [['id', 'desc'], [Foto, 'id', 'desc']],
        include: {
          model: Foto,
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
      const aluno = await Aluno.create(req.body); // Adicionado `await`
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

      const aluno = await Aluno.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "peso", "altura"],
        order: [['id', 'desc'], [Foto, 'id', 'desc']],
        include: {
          model: Foto,
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

      const aluno = await Aluno.findByPk(id);
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

      const aluno = await Aluno.findByPk(id);
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

export default new AlunoController();
