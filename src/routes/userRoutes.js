import { Router } from 'express'
import userController from '../controllers/UserController'
import loginRequired from '../middlewares/loginRequired';


const router = new Router();

//Nao precisa Existir
//router.get('/', loginRequired, userController.index)
//router.get('/:id', userController.show)

router.post('/', loginRequired, userController.store)
router.put('/', loginRequired, userController.update)
router.delete('/', loginRequired, userController.delete)
router.patch('/:id', userController.restore); // Restaurar usuário

export default router;

/*
index -> lista todos os usuario ->Get
store -> cria um novo usuario -> Post
delete-> apaga um usuario ->Delete
show -> mostra um usuario -> Get
update->atualiza um usuario -> Patch ou Put

*/