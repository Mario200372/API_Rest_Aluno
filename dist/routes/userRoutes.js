"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);


const router = new (0, _express.Router)();

//Nao precisa Existir
//router.get('/', loginRequired, userController.index)
//router.get('/:id', userController.show)

router.post('/', _loginRequired2.default, _UserController2.default.store)
router.put('/', _loginRequired2.default, _UserController2.default.update)
router.delete('/', _loginRequired2.default, _UserController2.default.delete)
router.patch('/:id', _UserController2.default.restore); // Restaurar usuário

exports. default = router;

/*
index -> lista todos os usuario ->Get
store -> cria um novo usuario -> Post
delete-> apaga um usuario ->Delete
show -> mostra um usuario -> Get
update->atualiza um usuario -> Patch ou Put

*/