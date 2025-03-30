"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 30],
              msg: 'campo nome deve ter entre 3 a 30',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
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
          type: _sequelize2.default.STRING,
          defaultValue: '',

        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter entre 6 a 50 caracteres',
            },
          },
        },
        deleted_at: {
          type: _sequelize2.default.DATE,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }
  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash)
  }
} exports.default = User;
