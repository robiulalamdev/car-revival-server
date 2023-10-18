import { IUser } from './user.interface';
import { User } from './user.model';

// get all users
const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find({}).sort({ _id: -1 });
  return users;
};

// get single user
const getSingleUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });
  return user;
};

// update user info
const updateUserById = async (
  id: string,
  updateData: object
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return user;
};

// delete user
const deleteUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete({ _id: id });
  return user;
};


export const UserService = {
  getUsers,
  getSingleUserById,
  updateUserById,
  deleteUserById
};
