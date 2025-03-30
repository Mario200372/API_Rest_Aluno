"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
process.noDeprecation = true;

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 10],
              msg: 'O nome deve ter entre 3 e 10 caracteres.',
            },
          },
        },
        sobrenome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 10],
              msg: 'O sobrenome deve ter entre 3 e 10 caracteres.',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'O e-mail informado não é válido.',
            },
          },
        },
        idade: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          defaultValue: 0, // Corrigido para um número válido
          validate: {
            isInt: {
              msg: 'A idade deve ser um número inteiro.',
            },
            min: {
              args: [1],
              msg: 'A idade deve ser maior que 0.',
            },
          },
        },
        peso: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
          defaultValue: 0, // Corrigido para um número válido
          validate: {
            isFloat: {
              msg: 'O peso deve ser um número válido (ex: 70.5).',
            },
            min: {
              args: [1],
              msg: 'O peso deve ser maior que 0.',
            },
          },
        },
        altura: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
          defaultValue: 0, // Corrigido para um número válido
          validate: {
            isFloat: {
              msg: 'A altura deve ser um número válido (ex: 1.75).',
            },
            min: {
              args: [0.5],
              msg: 'A altura deve ser maior que 0.5m.',
            },
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
        tableName: 'alunos',
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );
    return this;


  }
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' })
  }
} exports.default = Aluno;
