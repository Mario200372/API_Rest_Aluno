import { Router } from 'express'
import loginRequired from '../middlewares/loginRequired';

import fotoControlller from '../controllers/FotoController'



const router = new Router();


router.post('/', loginRequired, fotoControlller.store)

export default router;