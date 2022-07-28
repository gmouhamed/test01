import { Router } from 'express';
const router = Router();
const { loginCommercant, logout} = require('../controllers/authController');

router.route('/login').post(loginCommercant)
router.route('/logout').get(logout)

module.exports = router;