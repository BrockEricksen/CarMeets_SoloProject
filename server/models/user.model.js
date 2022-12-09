const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required!"]
    },
    
    lastName: {
      type: String,
      required: [true, "Last name is required!"]
    },
  
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate: { // email validator using regex
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email!"
      },
    },
    
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be 8 characters or longer!"]
    }
}, {timestamps: true});


UserSchema.virtual('confirmPassword') // using virtual field for confirm password
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );
  
UserSchema.pre('validate', function(next) { // validator to compare password and confirm password
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password!');
    }
    next();
});
  
UserSchema.pre('save', function(next) { // using bcrypt to hash user password so it is not saved in plain text
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
        next();
        });
});

const User = mongoose.model("User", UserSchema);

module.exports = User