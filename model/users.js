const { Schema, model } = require("mongoose");
const { hash, genSalt } = require("bcryptjs");

const usersSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    default: `india`,
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: "wallets",
  },
});

usersSchema.pre("save", async function () {
  let user = this;
  if (user.isModified("password")) {
    let salt = await genSalt(10);
    user.password = await hash(user.password, salt);
  }
});

module.exports = model("users", usersSchema);
