import { Router } from 'express'
import { getHome } from './controllers/home'
import { getLogin, getLogout, postLogin } from './controllers/session'
import { hasSession } from './middlewares/session'

export const router = Router()

router.get('/login', getLogin)
router.post('/login', postLogin)

router.use(hasSession())

router.get('/', getHome)
router.get('/logout', getLogout)
