import { Model } from 'mongoose';
import { User } from 'src/modules/users/domain/entities/users.entity';

export async function isRegisteredEmail(
  userModel: Model<User>,
  email: string,
): Promise<boolean> {
  try {
    const user = await userModel.findOne({ email }).exec();
    return !!user;
  } catch (error) {
    return false;
  }
}
