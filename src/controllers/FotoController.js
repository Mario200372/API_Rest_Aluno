import multer from "multer";
import multerConfig from "../config/multerConfig";
import Foto from "../models/Foto";

const upload = multer(multerConfig).single("foto");

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

        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.json(foto);

      } catch (err) {
        return res.status(500).json({
          errors: ["Erro ao salvar a foto"],
        });
      }
    });
  }
}

export default new FotoController();
