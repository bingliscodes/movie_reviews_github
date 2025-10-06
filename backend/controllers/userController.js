import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';

import { getAll, getOne } from './handlerFactory.js';

export const getAllUsers = getAll(User);

export const getUser = getOne(User);

export const addToList = catchAsync(async (req, res, next) => {
  /* 
    The request should contain the name of the list that will be updated and the id to add. 
 */
  const { listName, mediaId } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { [listName]: mediaId } },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: { data: updatedUser },
  });
  next();
});
