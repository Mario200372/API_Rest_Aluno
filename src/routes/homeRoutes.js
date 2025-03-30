import { Router } from 'express'
import homeControlller from '../controllers/HomeController'
const router = new Router();


router.get('/', homeControlller.index)

export default router;