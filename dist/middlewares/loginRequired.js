"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken); // Importa a biblioteca JWT para geração de tokens
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
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
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await _User2.default.findOne({
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
