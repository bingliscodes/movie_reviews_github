import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';

import { getAll, getOne } from './handlerFactory.js';

export const getAllUsers = getAll(User);

export const getUser = getOne(User);

export const addToMovieWatchList = catchAsync(async (req, res, next) => {
  console.log(req.user);
  console.log(req.body.movieId);

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { movieWatchList: req.body.movieId } },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: { data: updatedUser },
  });
  next();
});
