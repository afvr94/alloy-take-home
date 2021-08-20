import { Document, model, Schema } from 'mongoose';

interface IAccountSchema extends Document {
  email: string;
  password: string;
  slackAccessToken: string;
  shopifyAccessToken: string;
}

const AccountSchema = new Schema<IAccountSchema>({
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

const Account = model<IAccountSchema>('Account', AccountSchema);

export default Account;
