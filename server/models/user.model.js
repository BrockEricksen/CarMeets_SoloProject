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

// Virtual field for confirm password so it doesnt save to db
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

// Middleware
UserSchema.pre('validate', function(next) { // validator to compare password and confirm password
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password!');
    }
    next();
});

// Using bcrypt to hash user password so it is not saved in plain text
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
        next();
        });
});

module.exports = mongoose.model("User", UserSchema);