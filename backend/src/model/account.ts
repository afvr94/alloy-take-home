import { Document, model, Schema } from 'mongoose';

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // TODO: CHECK IF THIS IS THE ONLY THING NEEDED
  slackAccessToken: {
    type: String,
  },
  // TODO: CHECK IF THIS IS THE ONLY THING NEEDED
  shopifyAccessToken: {
    type: String,
  },
});

interface IUserSchema extends Document {
  email: string;
  password: string;
  slackAccessToken: string;
  shopifyAccessToken: string;
}

const Account = model<IUserSchema>('Account', AccountSchema);

export default Account;
