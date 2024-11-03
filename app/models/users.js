import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    // required: true,
    minlength: 8,
  },
  phone: {
    type: String,
    // required: true,
  },
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user',
  // },
  // isActive: {
  //   type: Boolean,
  //   default: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
{timestamps: true});

const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;