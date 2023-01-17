const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hashSync(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = model('User', userSchema)