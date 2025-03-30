import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 30],
              msg: 'campo nome deve ter entre 3 a 30',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email ja existe'
          },
          validate: {
            isEmail: {
              msg: 'Email invalido',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',

        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter entre 6 a 50 caracteres',
            },
          },
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null, // Adicionado para evitar o erro
        },
      }, {
      sequelize,
      tableName: 'users',
      timestamps: true,
      paranoid: true,
      underscored: true,
      deletedAt: 'deleted_at',
    }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash)
  }
}
