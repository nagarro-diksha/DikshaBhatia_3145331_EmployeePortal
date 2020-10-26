const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// pre-hook - convert text password to hash value before saving in database
UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      //bcrypt is used to hash user passwords
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );


// Validate the password entered by the user
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
  }
  

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;