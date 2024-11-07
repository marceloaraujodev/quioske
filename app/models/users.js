import mongoose from 'mongoose';
import Menu from './menu';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: function () { return this.isCredentialUser; }, // Only required for credential users,
    minlength: 8,
  },
  phone: {
    type: String,
    required: false,
  },
  menu: {
    type:mongoose.Schema.Types.ObjectId,
    ref: Menu
  }, // Embed the menu schema 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isCredentialUser: {
    type: Boolean,
    default: false, // Track if the user signed up with credentials
  },
},
{timestamps: true});

const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;