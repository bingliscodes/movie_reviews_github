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
  getWatched,
  getWish,
  getFavorites,
  getMe,
  removeFromList,
  getAllLists,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// Protects all routes after this middleware and adds the user to request
router.use(protect);

router.get('/me', getMe, getUser);
// These are post requests because they send the user id in the req body
router
  .route('/me/watched')
  .get(getWatched)
  .post(addToList)
  .delete(removeFromList);
router.route('/me/wish').get(getWish).post(addToList).delete(removeFromList);
router
  .route('/me/favorites')
  .get(getFavorites)
  .post(addToList)
  .delete(removeFromList);

router.get('/me/all-lists', getAllLists);

router.route('/').get(getAllUsers);

export default router;
