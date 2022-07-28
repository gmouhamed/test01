import { Router } from 'express';
const router = Router();

const { newPret, getPretCommercant} = require('../controllers/pretController');

router.route('/newPret').post(newPret)
router.route('/Pret/:id').get(getPretCommercant)

module.exports = router;