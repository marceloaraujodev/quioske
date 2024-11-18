import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    itemId: {
      type: String,
    }, 
    itemName: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0.01, 'Price must be at least $0.01']
    },
    img: {
      type: String
    },
    fulfilled: {
      type: Boolean,
      default: false,
    },
})

const OrderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Refers to the 'User' collection
    required: true 
  },
  name: {
    type: String,
    // required: true,
  },
  tableNumber: {
    type: String,
  },
  empresa: {
  type: String,
  },
  orderDetails: {
    type: [OrderItemSchema], 
    default: [],
  },
  totalAmount: {
    type: Number,
    // required: true,
    min: [0.01, 'Total amount must be at least $0.01']
  },
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

const Order = mongoose.models?.Order || mongoose.model('Order', OrderSchema);

export default Order;