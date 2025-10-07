import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
