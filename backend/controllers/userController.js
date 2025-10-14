import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';

import { getAll, getOne } from './handlerFactory.js';

export const getAllUsers = getAll(User);

export const getUser = getOne(User);

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

export const addToList = catchAsync(async (req, res, next) => {
  const { listName, mediaId } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { [listName]: mediaId } },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: { data: updatedUser },
  });
  next();
});

export const removeFromList = catchAsync(async (req, res, next) => {
  const { listName, mediaId } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { [listName]: mediaId } },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: { data: updatedUser },
  });
  next();
});

export const getWatched = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  if (!currentUser) return next(new AppError('No user found', 401));

  const watchedMovies = currentUser.movieWatchList;
  const watchedTv = currentUser.tvWatchList;

  res.status(200).json({
    status: 'success',
    data: { watchedMovies, watchedTv },
  });
  next();
});

export const getWish = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  if (!currentUser) return next(new AppError('No user found', 401));

  const wishMovies = currentUser.movieWishList;
  const wishTv = currentUser.tvWishList;

  res.status(200).json({
    status: 'success',
    data: { wishMovies, wishTv },
  });
  next();
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  console.log('BODY:', req.body);
  console.log('HEADERS:', req.headers);

  // 2) Filter out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const getFavorites = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  if (!currentUser) return next(new AppError('No user found', 401));

  const favoriteMovies = currentUser.movieFavoriteList;
  const favoriteTv = currentUser.tvFavoriteList;

  res.status(200).json({
    status: 'success',
    data: { favoriteMovies, favoriteTv },
  });
  next();
});

export const getAllLists = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  if (!currentUser) return next(new AppError('No user found', 401));

  const {
    movieWishlist,
    tvWishlist,
    movieWatchlist,
    tvWatchlist,
    movieFavoriteList,
    tvFavoriteList,
  } = currentUser;

  res.status(200).json({
    status: 'success',
    data: {
      movieWishlist,
      tvWishlist,
      movieWatchlist,
      tvWatchlist,
      movieFavoriteList,
      tvFavoriteList,
    },
  });
  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
