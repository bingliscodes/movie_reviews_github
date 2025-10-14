import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'User must have a first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'User must have a last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'User must have a valid email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords must match',
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
    },
    tvWishlist: Array,
    tvWatchlist: Array,
    movieWishlist: Array,
    movieWatchlist: Array,
    tvFavoritelist: Array,
    movieFavoriteList: Array,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  // Only run if password is actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.addToList = function (list, id) {
  // list can be: movieWishList, movieWatchList, tvWishList, tvWatchList
  if (list === 'movieWatchList')
    this.movieWatchList = [...this.movieWatchList, id];
};

const User = mongoose.model('User', userSchema);

export default User;
