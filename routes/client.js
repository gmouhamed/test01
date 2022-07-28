import { Router } from 'express';
const router = Router();
// const generate_pdf = require('../middlewares/generate_pdf')
import { newClient, getAllClientCommercant } from '../controllers/clientController';

router.route('/newClient').post(newClient)
// router.route('/ClientsCommercant/:id').get(getAllClientCommercant)
router.route('/Client/:id').get(getAllClientCommercant)

export default router;