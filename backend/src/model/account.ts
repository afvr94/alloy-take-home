import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IAccountSchema extends Document<string> {
  email: string;
  password: string;
  slackAccessToken: string;
  slackChannelId: string;
  shopifyUrl: string;
  comparePassword: (password: string) => boolean;
  hashPassword: () => void;
  shopifyAccessToken: string;
}

const AccountSchema = new Schema<IAccountSchema>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopifyUrl: {
    type: String,
    required: true,
    trim: true,
  },
  // TODO: CHECK IF THIS IS THE ONLY THING NEEDED
  slackAccessToken: {
    type: String,
  },
  slackChannelId: {
    type: String,
  },
  // TODO: CHECK IF THIS IS THE ONLY THING NEEDED
  shopifyAccessToken: {
    type: String,
  },
});

AccountSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

AccountSchema.methods.hashPassword = function hashPassword() {
  this.password = bcrypt.hashSync(this.password, 10);
};

const Account = model<IAccountSchema>('Account', AccountSchema);

export default Account;
