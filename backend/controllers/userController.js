import catchAsync from '../utils/catchAsync.js';

export const test = catchAsync(async (req, res, next) => {
  console.log('hello world');
  next();
});
