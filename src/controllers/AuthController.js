import User from "../models/User.js";
import jwt from "jsonwebtoken";
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // duplicate username error
  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  // incorrectusername
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
    return errors;
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Password is not correct";
    return errors;
  }
};

const maxAge = 3 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, "polydecor", {
    expiresIn: maxAge,
  });
};

// controller actions
export const signup_get = (req, res) => {
  res.render("signup");
};

export const login_get = (req, res) => {
  res.render("login");
};

export const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, userInfo: user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

export const get_users_id = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User found:", user);

    res.status(200).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ error: errors });
  }
};
export const update_user = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    console.log("Updating user with ID:", updates);

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    // console.log("Updated User:", user);

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error updating user:", err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
export const forgotPassword_post = async (req, res) => {
  const { email } = req.body;
  const userId = req.params.id;
  try {
    // Tìm người dùng bằng email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No account with that email address exists." });
    }

    // Tạo mật khẩu tạm thời mới
    const tempPassword = Math.random().toString(36).slice(-8);

    // Mã hóa mật khẩu tạm thời
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    // Cập nhật mật khẩu tạm thời cho người dùng
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    // Cấu hình gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "giabao20032001@gmail.com", 
        pass: "czsd yqxh qgpn edce",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: user.email,
      subject: "Your new temporary password",
      text: `Your password has been reset. Your new temporary password is: ${tempPassword}\n\nPlease log in using this password and change it immediately.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("There was an error: ", err);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        res.status(200).json({ message: "Temporary password sent to email." });
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
