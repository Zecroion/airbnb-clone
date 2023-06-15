import { Router } from 'express'
import { register, login, logout } from '../controllers/authentication.controller'

export default (router: Router) => {
    router.post('/api/register', register);
    router.post('/api/login', login);
    router.post('/api/logout', logout);
}