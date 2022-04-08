const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
//   tckn: {
//     type: String,
//     required: true,
//   },
//   isAccountActive: {
//     type: Boolean,
//     default:false,
//   }
});

module.exports = mongoose.model('User',userSchema);
