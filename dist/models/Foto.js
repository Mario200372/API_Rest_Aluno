"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Foto extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo não pode ficar vazio.",
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo não pode ficar vazio.",
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_appConfig2.default.url}/images/${this.getDataValue("filename")}`;
          },
        },
        deleted_at: {
          type: _sequelize2.default.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        tableName: "fotos",
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id", as: "aluno" });
  }
} exports.default = Foto;
