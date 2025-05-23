"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single("foto");

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.message], // Use error.message para retornar a mensagem completa
        });
      }

      if (!req.file) {
        return res.status(400).json({
          errors: ["Arquivo não enviado"],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body; // Corrigido o nome da variável

        const foto = await _Foto2.default.create({ originalname, filename, aluno_id });

        return res.json(foto);

      } catch (err) {
        return res.status(500).json({
          errors: ["Erro ao salvar a foto"],
        });
      }
    });
  }
}

exports. default = new FotoController();
