import express from 'express';
import {
  signup,
  login,
  logout,
  protect,
} from '../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  addToList,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Protects all routes after this middleware and adds the user to request
router.use(protect);

router.route('/').get(getAllUsers);

router.route('/:id').get(getUser);

router.route('/:id/watched').post(addToList);
router.route('/:id/wish').post(addToList);
router.route('/:id/favorites').post(addToList);

export default router;
