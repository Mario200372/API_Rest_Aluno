import jwt from 'jsonwebtoken'; // Importa a biblioteca JWT para geração de tokens
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  // Verifica se o cabeçalho de autorização está presente
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required (Obrigatório)'],
    });
  }

  // Extrai o token do cabeçalho Authorization (formato esperado: "Bearer <token>")
  const [, token] = authorization.split(' ');

  try {
    // Verifica e decodifica o token usando a chave secreta
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email
      }
    })
    if (!user) {
      return res.status(401).json({
        errors: ['Usuario Invalido'],
      });

    }

    // Adiciona os dados do usuário à requisição para uso posterior
    req.userId = id;
    req.userEmail = email;

    return next(); // Continua para o próximo middleware ou rota

  } catch (error) {
    return res.status(401).json({
      errors: ['Token Expirado ou Inválido'],
    });
  }
};
