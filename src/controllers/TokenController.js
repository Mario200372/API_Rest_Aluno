import User from '../models/User'; // Importa o modelo User
import jwt from 'jsonwebtoken'; // Importa a biblioteca JWT para geração de tokens
// Importa a biblioteca JWT para geração de tokens

class TokenController {
  async store(req, res) {
    // Extrai email e senha do corpo da requisição
    const { email = '', password = '' } = req.body;

    // Verifica se email e senha foram fornecidos
    if (!email || !password) {
      return res.status(401).json({
        errors: ['O Email ou a Senha Incorreta']
      });
    }

    // Busca o usuário no banco de dados pelo email
    const user = await User.findOne({ where: { email } });

    // Se o usuário não existir, retorna erro
    if (!user) {
      return res.status(401).json({
        errors: ['Usuario nao Existe']
      });
    }

    if (!(await user.passwordIsValid(password))) {

      return res.status(401).json({
        errors: ['Senha invalida']
      });
    }
    // Retorna o token gerado para o cliente
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    })
    return res.json({ token });
  }
}

export default new TokenController(); // Exporta a instância da classe TokenController
