import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: false, // Trường email không yêu cầu
    unique: false,   // Không yêu cầu duy nhất
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// static method to login user
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username: username });

  if (user) {
    console.log(user);
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const User = mongoose.model("User", userSchema);

export default User;
