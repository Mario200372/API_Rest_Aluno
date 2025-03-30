import Sequelize, { Model } from "sequelize";
process.noDeprecation = true;

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 10],
              msg: 'O nome deve ter entre 3 e 10 caracteres.',
            },
          },
        },
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 10],
              msg: 'O sobrenome deve ter entre 3 e 10 caracteres.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'O e-mail informado não é válido.',
            },
          },
        },
        idade: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.FLOAT,
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
          type: Sequelize.FLOAT,
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
          type: Sequelize.DATE,
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
}
