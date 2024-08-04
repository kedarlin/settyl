import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};