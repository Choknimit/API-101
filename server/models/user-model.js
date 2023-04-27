const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  [
    {
      name: { type: String, require: true, trim: true },
      email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        index: true,
      },
      password: { type: String, require: true, trim: true, minlength: 5 },
      role: { type: String, default: "member" },
    },
  ],
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

userSchema.methods.checkPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

// userSchema.method('encrypt', function(password)  {
//     const salt =  bcrypt.genSalt(10);
//     const hashPassword =  bcrypt.hash(password, salt);
//     return hashPassword;

// })

const user = mongoose.model("User", userSchema);

module.exports = user;
